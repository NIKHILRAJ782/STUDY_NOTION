const User = require("../models/user");
const OTP = require("../models/OTP");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const {passwordUpdated} = require("../mail/passwordUpdate");
const Profile = require("../models/Profile");
require("dotenv").config();

//signup
exports.signup = async (req,res) => {

    try{
        //data fetch from request ki body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp} = req.body;

        //validate karlo
        console.log("request data is : " , req.body);
        if(!firstName || !lastName || !email|| !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:'Please fill all the details',
            })
        }

        //confirm password and password match karlo
        if(password !== confirmPassword) {
            return res.status(400).json({
                success:false,
                message:'Password and Confirm Password not same',
            })
        }

        //check user already exist or not
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:'User is already registered',
            })
        }

        //find the most recent OTP stored for the user
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log("recent OTP-> ",recentOtp);

        //validate the OTP from database and entered by user
        if(recentOtp.length ==0){
            //OTP not found
            return res.status(400).json({
                success:false,
                message:'OTP not found or of 0 length',
            })
        }
        else if(otp !== recentOtp[0].otp){
            //Invalid OTP
            return res.status(400).json({
                success:false,
                message:'Invalid OTP',
            })
        }

        //hash password
        const hashedPassword = await bcrypt.hash(password,10);

        //create entry in DB

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            //approved: approved,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        //return res
        return res.status(200).json({
            success:true,
            message:'User is registered Successfully',
            user,
        });
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`user cannot be registered please try again ${error}` ,
        });
    }
}

//login
exports.login = async(req,res) => {
    try{
        //get data from req body
        const {email,password} = req.body;

        //validation data
        if(!email|| !password ){
            // Return 400 Bad Request status code with error message
            return res.status(400).json({
                success:false,
                message:'Please fill all the field details',
            });
        }
        //user check exist or not
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User is not registered , please signup first",
            });
        }
        //generate JWT , after password matching
        if(await bcrypt.compare(password, user.password))
        {
            const token = jwt.sign(
				{ email: user.email, id: user._id, accountType: user.accountType },
				process.env.JWT_SECRET,
				{
					expiresIn: "24h",
				}
			);
            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            return res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:'User Logged In successfully',
            });
        }
        else{
            return res.status(200).json({
                success:false,
                message:'Password is Incorrect',
            });
        }
        
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Login failure, please try again',
        });
    }
}

//send OTP
exports.sendotp = async(req,res) => {
    try{
        console.log("reached here" , req.body);
        
        //fetch email from request body
        const {email} = req.body;

        console.log(" not checked the user");
        //check if user is already present
        const checkUserPresent = await User.findOne({email : email});
        console.log("checked the user" , checkUserPresent);

        //if user already exist, then return a response
        if(checkUserPresent) {
            return res.status(404).json({
                success:false,
                message:'User already registered',
            });
        }

        console.log("check user : " , checkUserPresent);

        //generate otp
        var otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("otp generated-> ",otp);

        //check for uniqueness or unique otp
        const result = await OTP.findOne({otp: otp});
        console.log("Result: ",result);
        while(result) {
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
            });
        }

        const otpPayload = {email,otp};

        //create an entry in DB
        const otpBody = await OTP.create(otpPayload);
        console.log("otpbody-> ",otpBody);

        //return response successful
        res.status(200).json({
            success:true,
            message:'OTP Sent Successfully',
            otp,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//changepassword
exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword } = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		// Match new password and confirm new password
		// if (newPassword !== confirmNewPassword) {
		// 	// If new password and confirm new password do not match, return a 400 (Bad Request) error
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The password and confirm password does not match",
		// 	});
		// }

		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
				passwordUpdated(
					updatedUserDetails.email,
					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
				)
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};