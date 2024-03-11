import React,{useState} from "react";
import { useForm } from "react-hook-form";
import IconBtn from "../../../../common/IconBtn";
import { MdAddCircleOutline } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux";
import NestedView from "./NestedView";
import { setCourse,setEditCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";
import { MdNavigateNext } from "react-icons/md"
import { createSection,updateSection } from "../../../../../services/operations/courseDetailsAPI";

const CourseBuilderForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm()


    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [editSectionName, setEditSectionName] = useState(null);
    const {course} = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    console.log('the course is : ' , course);

    const onSubmit = async(data) => {
        setLoading(true);
        console.log("the submitted data is : " , data);
        let result;
        if(editSectionName) {
            //we are editing the section
            result = await updateSection(
                {
                  sectionName: data.sectionName,
                  sectionId: editSectionName,
                  courseId: course._id,
                },
                token
            )
        }
        else {
            result = await createSection(
              {
                sectionName: data.sectionName,
                courseId: course._id,
              },
              token
            )
        }
        if (result) {
            // console.log("section result", result)
            dispatch(setCourse(result))
            // setEditSectionName(null)
            setValue("sectionName", "")
        }
        setLoading(false);
    }

    const cancelEdit = () => {
        setEditSectionName(null);
        setValue("sectionName","");
    }

    const goToNext = () => {
        if(course.courseContent.length===0)
        {
            toast.error("Please add atleast one section")
            return
        }
        if( course.courseContent.some((section) => section.subSection.length === 0)) 
        {
            toast.error("Please add atleast one lecture in each section")
            return
        }
        //else everything is true goto next step
        dispatch(setStep(3));
    }
    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const handleChangeEditSectionName = (sectionId,sectionName) => {
        if(editSectionName === sectionId){
            cancelEdit();
            return;
        }
        setEditSectionName(sectionId)
        setValue("sectionName", sectionName)
    }

    return(
        <div className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
            <p className="text-2xl font-semibold text-richblack-5">
                Course Builder
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col space-y-2">
                    <label className="text-sm text-richblack-5" htmlFor="sectionName">
                        Section Name <sup className="text-pink-200">*</sup>
                    </label>
                    <input
                        id="sectionName"
                        disabled={loading}
                        placeholder="Add a section to build your course"
                        {...register("sectionName", { required: true })}
                        className="form-style w-full"
                    />
                    {errors.sectionName && (
                        <span className="ml-2 text-xs tracking-wide text-pink-200">Section name is Required</span>
                    )}
                </div>
                <div className="flex items-end gap-x-4">
                    <IconBtn
                        type="Submit"
                        disabled={loading}
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        outline={true}
                    >
                        <MdAddCircleOutline size={20} className="text-yellow-50" />
                    </IconBtn>
                    {editSectionName && (
                        <button
                        type="button"
                        onClick={cancelEdit}
                        className="text-sm text-richblack-300 underline"
                        >
                        Cancel Edit
                        </button>
                    )}
                </div>
            </form>
            {course?.courseContent?.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
            )}

            {/* Next Back Button */}
            <div className="flex gap-x-2 justify-end">
                <button onClick={goBack} className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-2 px-5 font-semibold text-richblack-900 ">
                    Back
                </button>
                <IconBtn disabled={loading} text="Next" onclick={goToNext}>
                    <MdNavigateNext/>
                </IconBtn>
            </div>
        </div>
    )
}

export default CourseBuilderForm;