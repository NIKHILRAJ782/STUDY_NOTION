import React from 'react'
import frameImage from "../../../assets/Images/frame.png";
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'


const Template = ({title, description1, description2, image, formtype}) => {

    console.log("ye rha mera form type");
    console.log(formtype)
  return (
    <div className='mx-auto my-auto flex w-11/12 max-w-maxContent flex-col-reverse justify-between gap-y-12 py-12 md:flex-row md:gap-y-0 md:gap-x-12'>

        <div className='mx-auto w-11/12 max-w-[450px] md:mx-0'>
            <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>{title}</h1>
            <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                <span className="text-richblack-100">{description1}</span>
                {" "}
                <span className="font-edu-sa font-bold italic text-blue-100">{description2}</span>
            </p>

            {formtype === "login" ? <LoginForm/>:<SignupForm/>}

        </div>

        <div className='relative mx-auto w-11/12 max-w-[450px] md:mx-0'>
            <img src={frameImage}
                alt="Pattern"
                width={558}
                height={504}
                loading="lazy"/>

            <img src={image}
                alt="Students"
                width={558}
                height={490}
                loading="lazy"
                className='absolute -top-4 right-4 z-10'/>    
        </div>

    </div>
  )
}
// const Template = ({title, description1, description2, image, formtype, setIsLoggedIn}) => {

//     console.log("ye rha mera form type");
//     console.log(formtype)
//   return (
//     <div className='text-black'>

//         <div>
//             <h1>{title}</h1>
//             <p>
//                 <span>{desc1}</span>
//                 <span>{desc2}</span>
//             </p>

//             {formtype === "signup" ? 
//             (<SignupForm setIsLoggedIn={setIsLoggedIn}/>):
//             (<LoginForm setIsLoggedIn={setIsLoggedIn}/>)}

//             <div>
//                 <div></div>
//                 <p>OR</p>
//                 <div></div>
//             </div>

//             <button>
//                 <p>Sign Up with Google</p>
//             </button>

//         </div>

//         <div>
//             <img src={frameImage}
//                 alt="Pattern"
//                 width={558}
//                 height={504}
//                 loading="lazy"/>

//             <img src={image}
//                 alt="Students"
//                 width={558}
//                 height={490}
//                 loading="lazy"/>    
//         </div>

//     </div>
//   )
// }

export default Template
