import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OtpInput from 'react-otp-input';
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { RxCountdownTimer } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { sendOtp, signUp } from "../services/operations/authAPI";

const VerifyEmail = () => {
    const[otp,setOtp] = useState("");
    const{signupData,loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect( () => {
        if(!signupData) {
            navigate("/signup");
        }
    },[]);
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;
        console.log("the otp is....",otp);
        dispatch(
            signUp(
              accountType,
              firstName,
              lastName,
              email,
              password,
              confirmPassword,
              otp,
              navigate
            )
        );
    }
    return(
     <div className="min-h-[calc(100vh-3.5rem)] grid place-items-center">
        {
            loading ? (<div className="spinner"></div>) :
            (
            <div className="max-w-[500px] p-4 lg:p-8">
                <h1 className="text-richblack-5 font-semibold text-[1.875rem] leading-[2.375rem]">
                    Verify Email
                </h1>
                <p className="text-[1.125rem] leading-[1.625rem] my-4 text-richblack-100">
                    A verification code has been sent to you. Enter the code below
                </p>
                <form onSubmit={handleOnSubmit}>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        // renderSeparator={<span>-</span>}
                        // shouldAutoFocus
                        renderInput={(props) =>( 
                            <input
                                {...props} 
                                placeholder="-"
                                // value={otp}
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                            />
                        )}
                        containerStyle={{
                            justifyContent:"space-between",
                            gap:"0 8px"
                        }}
                    />
                    <button
                    type="submit"
                    className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
                    >
                    Verify Email
                    </button>
                </form>
                <div className="mt-6 flex items-center justify-between">
                    <Link to="/login">
                    <p className="text-richblack-5 flex items-center gap-x-2">
                        <BiArrowBack /> Back To Login
                    </p>
                    </Link>
                    <button
                    className="flex items-center text-blue-100 gap-x-2"
                    onClick={() => dispatch(sendOtp(signupData.email, navigate))}
                    >
                    <RxCountdownTimer />
                    Resend it
                    </button>
                </div>
            </div>
            )
        }
     </div>   
    )
}

export default VerifyEmail;





// import React, { useEffect, useRef, useState } from "react"
// import './EnterOtp.css'
// import { FaClockRotateLeft } from "react-icons/fa6";
// import { FaLongArrowAltLeft } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {signUp} from '../services/operations/authAPI';

// const EnterOtp = (props) => {

//     const [otp , setopt] = useState(["-","-","-","-","-","-"]);
//     const [currFocus , setCurrFocus] = useState(0);

//     const setFocus = useRef(null);
//     const navigate = useNavigate();
//     const  dispatch = useDispatch();
//     const userData = useSelector((state) => (state.auth.signupData));

//     useEffect(() => {
//         if(setFocus.current){
//             setFocus.current.focus();
//         }
//     } , [otp]);

//     function verifyEmailHandler(){
//         //now we have to verify the email and if the opt is currect we have to create the user
//         //into the db as a new user
//         const stringifiedOtp = otp.join('');
//         console.log("OTP Is: ",otp)
//         const dataPayload = {...userData , otp : stringifiedOtp};
//         console.log('the created data payload for account creation is : ' , dataPayload);
//         dispatch(signUp(navigate,dataPayload));
//     }

//     function otpHandler(e , index) {
//         const boxElement = e.target.value;
//         setopt((prevotp) => {
//             const newOtp = [...prevotp];
//             newOtp[index] = boxElement;
//             setCurrFocus(prev => (
//                 boxElement === "" ? (index-1 > 0 ? index-1 : 0) : (index+1 < 6 ? index+1 : 5)
//             ))

//             return newOtp
//         })
//     }

//   return (
//     <div className="enterOtp_wrapper">
//       <div className="enterOtp">
//         <h1>Verify email</h1>
//         <p>A verification code has been sent to you. Enter the code below</p>
//         <div className="otp_filling_container">
//             {
//                 otp.map((eachele , index) => {
//                     return(
//                         index === currFocus ? (
//                             <input type="text" placeholder="-" key={index} 
//                             onChange={(e)=> {
//                                 otpHandler(e,index);
//                             }}
//                             className="yellow_focus_border" ref={setFocus} maxLength={1}
//                             ></input>
//                         ) : (
//                             <input type="text" placeholder="-" key={index} maxLength={1}
//                             onClick={()=>{
//                                 setCurrFocus(index);
//                             }}
//                             ></input>
//                         )
//                     )
//                 })
//             }
//         </div>
//         <div onClick={verifyEmailHandler}>
//             <button>Verify email</button>
//         </div>
//         <div>
//             <Link to={"/logIn"}><FaLongArrowAltLeft /> Back to login</Link>
//             <div>
//                 <FaClockRotateLeft></FaClockRotateLeft>
//                 Resend it
//             </div>
//         </div>
//       </div>
//     </div>
//   )
// };

// export default EnterOtp;