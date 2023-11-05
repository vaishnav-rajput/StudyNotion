const CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/Subsection")

exports.updateCourseProgress = async(req, res) => {
    const {courseId, subSectionId} = req.body
    const userId = req.user.id
    try {
        //check if the subsection is valid
        const subSection = await SubSection.findById(subSectionId)

        if(!subSection){
            return res.status(404).json({
                error: "subsectionId invalid"
            })
        }

        //check for old entry
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })

        if(!courseProgress){
            return res.status(404).json({
                success: false,
                message: "course progress does not exist"
            })
        } else {
            //if course progress is valid

            //check for re-marking as complete  video/subsection
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    error: "Subsection is already completed"
                })
            }

            //push into completed videos
            courseProgress.completedVideos.push(subSectionId)
        }

        await courseProgress.save()
        return res.status(200).json({
            success: true,
            message: "course progress updated"
        })

    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error: "internal server error"
        })        
    }
} 