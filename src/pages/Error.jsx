import React from "react";
import error404 from "../assets/Images/error404.jpg";

const Error = () => {
    return(
        <div className='flex justify-center items-center my-auto mx-auto'>
            <img src={error404} alt="Error-Image" className="rounded-md shadow-[0_0_40px_0] shadow-[#ff8181]" />
        </div>
    )
}

export default Error