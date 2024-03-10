import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
//import { toast } from 'react-hot-toast';
// import Tab from '../../common/Tab';
//import { ACCOUNT_TYPE } from '../../../utils/constants';
import { useDispatch } from 'react-redux';
import {login} from "../../../services/operations/authAPI";


function LoginForm () {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // student or instructor
    //const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [formData, setFormData] = useState( {
        email:"", password:""
    })

    const[showPassword, setShowPassword] = useState(false);

    const { email, password } = formData

    function changeHandler(event) {

        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )

    }

    function submitHandler(event) {
        event.preventDefault();
        dispatch(login(email, password, navigate))
    }

    // data to pass to Tab component
    // const tabData = [
    //     {
    //     id: 1,
    //     tabName: "Student",
    //     type: ACCOUNT_TYPE.STUDENT,
    //     },
    //     {
    //     id: 2,
    //     tabName: "Instructor",
    //     type: ACCOUNT_TYPE.INSTRUCTOR,
    //     },
    // ]

  return (
    <div>
        {/* student-Instructor tab */}
        {/* <Tab tabData={tabData} field={accountType} setField={setAccountType} /> */}
        <form onSubmit={submitHandler} className="mt-6 flex w-full flex-col gap-y-4">
            <label className='w-full'>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Email Address<sup className="text-pink-200">*</sup>
                </p>
                <input 
                    required
                    type="email"
                    value = {email}
                    onChange={changeHandler}
                    placeholder="Enter email address"
                    name="email"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                />
            </label>

            <label className='relative'>
                <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                    Password<sup className="text-pink-200">*</sup>
                </p>
                <input 
                    required
                    type= {showPassword ? "text" : "password"}
                    value = {formData.password}
                    onChange={changeHandler}
                    placeholder="Enter Password"
                    name="password"
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-12 text-richblack-5"
                />

                <span onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                    {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />) : (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)}
                </span>

                <Link to="/forgot-password">
                    <p className="mt-1 ml-auto max-w-max text-xs text-blue-100">
                        Forgot Password
                    </p>
                </Link>
            </label>

            <button type="submit"
            className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                Sign In
            </button>

        </form>
    </div>
  )
}

export default LoginForm
