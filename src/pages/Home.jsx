import React from 'react';
import { Link } from 'react-router-dom';
import{FaArrowRight} from "react-icons/fa";
import HighLightText from '../components/core/HomePage/HighLightText';
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import Footer from '../components/common/Footer';
import TimeLineSection from '../components/core/HomePage/TimeLineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import Instructor from '../components/core/HomePage/Instructor';
import ReviewSlider from '../components/common/ReviewSlide';
import ExploreMore from '../components/core/HomePage/ExploreMore';


const Home = () => {
    return(
        <div>
            {/* Section 1 */}
            <div className='relative mx-auto flex flex-col w-11/12 items-center text-white justify-between max-w-maxContent'>
                <Link to={"/signup"}>
                    <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
                        <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                            <p>
                                Become an Instructor
                            </p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>

                <div className='text-center text-4xl font-semibold mt-7'>
                    Empower Your Future with  
                    <HighLightText text={" Coding Skills"}/>
                </div>

                <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resourses, including hands on projects, quizzes, and personlized feedback from anywhere
                </div>

                <div className='flex flex-row gap-7 mt-8'>
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div className='mx-3 my-14 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                    <video className="shadow-[20px_20px_rgba(255,255,255)]" muted loop autoPlay>
                        <source src={Banner} type="video/mp4" />
                    </video>
                </div>

                {/*Code Section 1*/}
                <div className='w-11/12'>
                    <CodeBlocks
                        position={"lg:flex-row"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Unlock Your
                                <HighLightText text={" coding potential "}/>
                                with our online courses
                            </div>
                        }
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"}
                        ctabtn1={
                            {
                                btnText:"Try it Yourself",
                                linkto:"/signup",
                                active:true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText:"Learn more",
                                linkto:"/login",
                                active:false,
                            }
                        }
                        codecolor={"text-yellow-25"}
                        codeblock={`<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<linkrel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1>\n<a href="/">Header</a></h1>\n<p>Welcome to Studynotion!</p>\n</body>`}
                        backgroundGradient={<div className="codeblock1 absolute"></div>}
                    />
                </div>

                {/*code section 2 */}
                <div>
                    <CodeBlocks
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className='text-4xl font-semibold'>
                                Start
                                <HighLightText text={" coding "}/>
                                <br/>
                                <HighLightText text={" in seconds "}/>
                            </div>
                        }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={
                            {
                                btnText:"Continue Lesson",
                                linkto:"/signup",
                                active:true,
                            }
                        }
                        ctabtn2={
                            {
                                btnText:"Learn more",
                                linkto:"/login",
                                active:false,
                            }
                        }
                        codeblock={`<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<linkrel="stylesheet" href="styles.css">\n</head>\n<body>\n<ul>\n<li>Explore Courses</li>\n<li>Buy Courses</li>\n</ul>\n</body>`}
                        codecolor={"text-pink-200"}
                        backgroundGradient={<div className="codeblock2 absolute"></div>}
                    />
                </div>

                <ExploreMore/>
            </div>

            {/* Section 2 */}
            <div className='bg-pure-greys-5 text-richblack-700'>
                {/* explore wala section */}
                <div className='homepage_bg h-[320px] '>
                        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8'>
                            <div className='lg:h-[140px]'></div>
                            <div className='flex flex-row gap-7 text-white mt-8 lg:mt-4'>
                                <CTAButton active={true} linkto={"/signup"}>
                                    <div className='flex items-center gap-3'>
                                        Explore Full Catalog
                                        <FaArrowRight/>
                                    </div>
                                </CTAButton>
                                <CTAButton active={false} linkto={"/signup"}>
                                    <div>
                                        Learn More
                                    </div>
                                </CTAButton>
                            </div>

                        </div>
                </div>
                {/* Get the Skills you need wala section */}
                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-8'>
                    <div className='flex flex-col mb-10 mt-[-100px] justify-between gap-7 lg:flex-row lg:mt-20 lg:gap-2 '>
                        <div className='text-center text-4xl font-semibold lg:w-[45%]'>
                            Get the skills you need for a<HighLightText text={" job that is in demand"}/>
                        </div>
                        <div className='flex flex-col items-start gap-10 lg:w-[40%] '>
                            <div className='text-base font-medium'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
                            <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                        </div>
                    </div>
                    <TimeLineSection/>

                    <LearningLanguageSection/>
                </div>
            </div>

            {/* Section 3 */}
            <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                {/* Become a instructor section */}
                    <Instructor/>

                {/* Reviws from Other Learner */}
                <h1 className="text-center text-4xl font-semibold mt-8">
                Reviews from other learners
                </h1>
                <ReviewSlider/>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Home