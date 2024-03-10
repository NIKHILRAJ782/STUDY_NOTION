const Profile = require("../models/Profile");
const User = require("../models/user");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const CourseProgess = require("../models/CourseProgess");
const Course = require("../models/course");
const mongoose = require("mongoose");




exports.updateProfile = async(req,res) => {
    try{
        //get data
        const {firstName = "",lastName = "",dateOfBirth="",about="",contactNumber="",gender=""}=req.body;
        //get userId
        const id = req.user.id;

        //find profile
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);

        const user = await User.findByIdAndUpdate(id, {
          firstName,
          lastName,
        })
        await user.save()

        //update profile fields
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;
        profile.gender = gender;

        // Save the updated profile
        await profile.save();

        // Find the updated user details
        const updatedUserDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()
        //return response
        return res.status(200).json({
            success:true,
            message:'Profile updated successfully',
            updatedUserDetails,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to update profile',
            error:error.message,
        });
    }
}

//delete account
//Explore-> how to schedule delete 
exports.deleteAccount = async(req,res) => {
    try{
        const id = req.user.id;
        console.log(id);

        //validation
        const user = await User.findById({_id:id});
        if(!user){
            return res.status(400).json({
                success:false,
                message:'User not found',
            });
        }
        //delete profile
        await Profile.findByIdAndDelete(
          {
            _id:new mongoose.Types.ObjectId(user.additionalDetails),
          });
        //TODO: unenroll user from all enrolled courses
        for (const courseId of user.courses) {
          await Course.findByIdAndUpdate(
            courseId,
            { $pull: { studentsEnroled: id } },
            { new: true }
          )
        }

        //delete user
        await User.findByIdAndDelete({_id:id});

        //return response
        return res.status(200).json({
            success:true,
            message:'User deleted successfully',
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to delete profile of user',
            error:error.message,
        });
    }
}

exports.getAllUserDetails = async(req,res) => {
    try{
        //get ID
        const id = req.user.id;
        //validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        console.log(userDetails);
        //return response
        return res.status(200).json({
            success:true,
            message:'User Details fetched successfully',
            data:userDetails,
        });

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Unable to get all profiles',
            error:error.message,
        });
    }
}

//updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};