import React from "react";
import TimelineImage from "../../../assets/Images/TimelineImage.png";
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";

const timeline = [
    {
      Logo: Logo1,
      Heading: "Leadership",
      Description: "Fully committed to the success company",
    },
    {
      Logo: Logo2,
      Heading: "Responsibility",
      Description: "Students will always be our top priority",
    },
    {
      Logo: Logo3,
      Heading: "Flexibility",
      Description: "The ability to switch is an important skills",
    },
    {
      Logo: Logo4,
      Heading: "Solve the problem",
      Description: "Code your way to a solution",
    },
  ];

const TimeLineSection = () => {
    return(
        <div>
            <div className=" mx-auto flex flex-col lg:flex-row gap-20 mb-20 items-center w-11/12">
                <div className="lg:w-[45%] flex flex-col gap-14 lg:gap-3">
                    {timeline.map((element,index) => {
                        return(
                            <div className="flex flex-col lg:gap-3 " key={index}>
                                <div className="flex gap-6" key={index}>
                                    <div className="w-[52px] h-[52px] bg-richblack-900 rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                                        <img src={element.Logo} alt="" />
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-[18px]">{element.Heading}</h2>
                                        <p className="text-base">{element.Description}</p>
                                    </div>
                                </div>
                                <div className={`hidden ${
                                        timeline.length - 1 === index ? "hidden" : "lg:block"
                                    }  h-14 border-dotted border-r-2 border-richblack-100 w-[26px]`}>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
                    <img
                        src={TimelineImage}
                        alt="timelineImage"
                        className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-fit"
                    />
                    <div className="absolute left-[50%] lg:bottom-0 translate-x-[-50%] lg:translate-y-[50%] translate-y-[-10%] bg-caribbeangreen-700 flex flex-row md:max-w-maxContent text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10 ">
                            {/* Section 1 */}
                            <div className="flex gap-5 items-center border-r border-caribbeangreen-300 px-4 lg:px-14">
                                <h1 className="text-3xl font-bold">10</h1>
                                <h1 className="text-caribbeangreen-300 text-sm">
                                    Years experiences
                                </h1>
                            </div>

                            {/* Section 2 */}
                            <div className="flex gap-5 items-center lg:px-14 px-4">
                                <h1 className="text-3xl font-bold">250</h1>
                                <h1 className="text-caribbeangreen-300 text-sm">
                                    types of courses
                                </h1>
                            </div>
                        </div>
                    </div>

                </div>

        </div>    
    )
}

export default TimeLineSection