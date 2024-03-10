const Section = require("../models/section");
const Course = require("../models/course");
const SubSection = require("../models/subSection");

exports.createSection = async(req,res) => {
    try{
        //data fetch
        const {sectionName, courseId} = req.body;
        //data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:'Missing required properties',
            });
        }
        //create section
        const newSection = await Section.create({sectionName});
        //update course with section ObjectId
        const updatedCourse = await Course.findByIdAndUpdate
        (
            courseId,
            {
                $push:{
                    courseContent:newSection._id,
                }
            },
            {new:true},
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        })
        .exec();

        //return response
        return res.status(200).json({
            success:true,
            message:'Section Created Successfuly',
            updatedCourse,
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Failed to create Section',
            error:error.message,
        });
    }
};

exports.updateSection = async(req,res) => {
    try{
        //data input
        const {sectionName,sectionId,courseId} = req.body;

        //data validation
        // if(!sectionName || !sectionId){
        //     return res.status(400).json({
        //         success:false,
        //         message:'Please fill all the details',
        //     });
        // }

        //update data
        const section = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new:true}
        );
        const course = await Course.findById(courseId)
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection",
            },
        })
        .exec();
        //return response
        return res.status(200).json({
            success:true,
            data:course,
            message:section,
        });

    }
    catch(error){
        console.error("Error updating section:", error);
        return res.status(500).json({
            success:false,
            message:'Failed to Update Section, please try again',
            error:error.message,
        }); 
    }
};

exports.deleteSection = async(req,res) => {
    try{
        //get ID - assuming that we are sending ID in params
        //req.params not working
        const {sectionId,courseId} = req.body;
        await Course.findByIdAndUpdate(courseId, {
			$pull: {
				courseContent: sectionId,
			}
		})
        //use findbyIdandDelete
        const section = await Section.findById(sectionId);
		console.log(sectionId, courseId);
		if(!section) {
			return res.status(404).json({
				success:false,
				message:"Section not Found",
			})
		}

		//delete sub section
		await SubSection.deleteMany({_id: {$in: section.subSection}});

		await Section.findByIdAndDelete(sectionId);

		//find the updated course and return 
		const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();
        
        //return response
        return res.status(200).json({
            success:true,
            message:'Section Deleted Successfuly',
            data:course
        });
    }
    catch(error){
        console.error("Error deleting section:", error);
        return res.status(500).json({
            success:false,
            message:'Failed to Delete Section, please try again',
            error:error.message,
        }); 
    }
}