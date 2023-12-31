import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { addCourseDetails, editCourseDetails, fetchCourseCategories } from '../../../../../services/operations/courseDetailsAPI'
import {HiOutlineCurrencyRupee} from "react-icons/hi"
import RequirementField from './RequirementField'
import IconBtn from "../../../../common/IconBtn"
import { COURSE_STATUS } from '../../../../../utils/constants'
import {setStep, setCourse} from "../../../../../slices/courseSlice"
import {toast} from "react-hot-toast"
import ChipInput from './ChipInput'
import Upload from "../Upload"

const CourseInformationForm = () => {
     const {register, handleSubmit, 
            setValue, getValues, 
            formState: {errors}
            }  = useForm()

    const dispatch = useDispatch()       
    const {token} = useSelector((state) => state.auth) 
    const {course, editCourse} = useSelector((state) => state.course)
    const [loading, setLoading] = useState(false)
    const [courseCategories, setCourseCategories] = useState([])

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true)
            const categories = await fetchCourseCategories()
            if(categories.length > 0){
                setCourseCategories(categories)

            }
            setLoading(false)

        }
        if(editCourse){
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.Description)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        }
        getCategories()        
    },[])

    const isFormUpdated = () => {
        const currentValues = getValues()
        if(currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.courseInstructions.toString()  )
            return true
        else
            return false
    }


    //handles next button click 
    const onSubmit = async(data) => {
        if(editCourse){
            if(isFormUpdated){
                const currentValues = getValues
                const formData = new FormData()
                formData.append("courseId",course._id)
                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName", data.courseTitle)
                }
                if(currentValues.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription", data.courseShortDesc)
                }
                if(currentValues.coursePrice !== course.price){
                    formData.append("price", data.coursePrice)
                } 
                
                // for tags 
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                  }

                if(currentValues.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.courseBenefits)
                } 
                if(currentValues.courseCategory._id !== course.category._id){
                    formData.append("category", data.courseCategory)
                } 
                if(currentValues.courseRequirements.toString() !== course.instructions.toString()){
                    formData.append("instructions", JSON.stringify(data.courseRequirements))
                } 
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage)
                }

                setLoading(true)
                const result = await editCourseDetails(formData, token)
                setLoading(false)
                if(result){
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                }
            }
            else{
                toast.error("No changes made so far")
            }
            return
        }
        
        //create a new course
        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("category", data.courseCategory)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("thumbnailImage", data.courseImage)
        formData.append("status", COURSE_STATUS.DRAFT)

        setLoading(true)
        const result = await addCourseDetails(formData, token)
        if(result){
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }
        setLoading(false)
    }


  return (
    <form onSubmit={handleSubmit(onSubmit)} className='rounded-md border-richblack-700 bg-richblack-800 p-6 space-y-8'>
        <div>
            <label htmlFor='courseTitle'>Course Title <sup>*</sup></label>
            <input 
                id='courseTitle'
                placeholder='enter course title'
                {...register("courseTitle", {required: true})}
                className='w-full'
            />
            {
                errors.courseTitle && (
                    <span>please enter course title</span>
                )
            }
        </div>

        {/* course short description  */}
        <div>
            <label className='courseShortDesc'>Course Short Description <sup>*</sup></label>
            <textarea 
                id='courseShortDesc'
                placeholder='enter description'
                {...register("courseShortDesc", {required: true})}
                className='min-h-[140px] w-full'
            />
            {
                errors.courseShortDesc && (
                    <span>please enter course description</span>
                )
            }
        </div>  

        {/* course price    */}
        <div className='relative'>
            <label className='coursePrice'>Course Price <sup>*</sup></label>
            <textarea 
                id='coursePrice'
                placeholder='enter course price'
                {...register("coursePrice", {required: true, valueAsNumber: true})}
                className='w-full'
            />
            <HiOutlineCurrencyRupee className="absolute top-1/2 text-richblack-400" />
            {
                errors.coursePrice && (
                    <span>course price is required</span>
                )
            }
        </div>  

        {/* category dropdown  */}
        <div>
            <label htmlFor='courseCategory'>Course Category<sup>*</sup></label>
            <select 
                className='text-black'
                id='courseCategory'
                defaultValue=""
                {...register("courseCategory", {required: true})}
                >
                    <option className='text-black' value="" disabled>Choose a Category</option>
                    {
                        !loading && courseCategories.map((category, index) => (
                            
                            <option key={index} value={category?._id}>
                                {category?.name}
                            </option>
                        ))
                    }
            </select>
            {errors.courseCategory && (
                <span>
                    Course Category is required
                </span>
            )
            }
        </div>



        {/* Course Tags */}
        <ChipInput
            label="Tags"
            name="courseTags"
            placeholder="Enter Tags and press Enter"
            register={register}
            errors={errors}
            setValue={setValue}
            getValues={getValues}
        />




        <Upload
            name="courseImage"
            label="Course Thumbnail"
            register={register}
            setValue={setValue}
            errors = {errors}
            editData={editCourse ? course?.thumbnail : null}
            getValues={getValues}
        />


        {/* Benefits of the course  */}
        <div>
            <label htmlFor='courseBenefits'>Benefits of the course <sup>*</sup></label>
            <textarea
            id='courseBenefits'
            placeholder='Enter benefits of the course'
            {...register("courseBenefits", {required:true}) }
            className='min-h-[130px] w-full'
            />
            {
                errors.courseBenefits && (
                    <span>
                        Benefits of the course are required
                    </span>
                )
            }
        </div>
        <RequirementField name="courseRequirements"
                        label="Requirements/Instructions"
                        register = {register}
                        errors={errors}
                        setValue= {setValue}
                        getValues= {getValues}
         />
         <div>
            {
                editCourse && (
                    <button 
                    onClick={() => dispatch(setStep(2))}
                    className='flex items-center gap-x-2 bg-richblack-300'
                    >
                        Continue Without Saving
                    </button>
                )
            }

            <IconBtn text={!editCourse ? "Next" : "Save Changes"} 
                    
            />
         </div>
    </form>
  )
}

export default CourseInformationForm