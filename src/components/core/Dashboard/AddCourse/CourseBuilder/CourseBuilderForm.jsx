import React from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { useState } from 'react'
import {MdAddCircleOutline} from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux'
import {BiRightArrow} from "react-icons/bi"
import { setEditCourse, setStep } from '../../../../../slices/courseSlice'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'

const CourseBuilderForm = () => {
  const {register, handleSubmit, setValue, formState: {errors}} = useForm()
  const [editSectionName, setEditSectionName] = useState(null)
  const {course} = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const {token} = useSelector((state) => state.auth)
  const [loading, setLoading ] = useState(false)

  const onSubmit = async(data) => {
    setLoading(true)
    let result
    if(editSectionName){
      //we are editing the section name
      result = await updateSection({
        sectionName: data.sectionName,
        sectionId: editSectionName,
        courseId: course._id
      }, token)
    } 
    // when section is being created 
    else{
      result = await createSection({
        sectionName: data.sectionName,
        courseId: course._id
      }, token)
    }

    //update values 


    //loading false
  }

  //cancel edit function
  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  const goBack = () => {
    dispatch(setStep(1))
    dispatch(setEditCourse(true))
  }

  const goToNext = () => {
    if(course.courseContent.lenght === 0){
      toast.error("Please add atleast one Section")
      return

    }
    if(course.courseContent.some((section) => section.subSection.length === 0)){
      toast.error("Please add atleast one lecture in each section ")
      return
    }
    //if all the required data is present
    dispatch(setStep(3))
  }
  return (
    <div>
      <p>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Section Name <sup>*</sup></label>
          <input  
            id='sectionName'
            placeholder='Add section name'
            {...register("sectionName", {required: true})}
            className='w-full'

            />
            {
              errors.sectionName && (
                <span>Section name is required</span>
              )
            }
        </div>
        <div className='mt-10 flex w-full'>
          <IconBtn  
            customClasses={"text-white"}
            type="submit"
            text={editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            >
              <MdAddCircleOutline className='text-yellow-50'/>
            </IconBtn>
            {editSectionName && (
              <button
                type='button'
                onClick={cancelEdit}
                className='text-sm text-richblack-300 underline ml-5'
                >
                Cancel Edit
              </button>
            )}
        </div>
      </form>
      {
        course.courseContent.length > 0 && (
          <NestedView/>
        )
      }
      <div className='flex justify-end gap-x-3'>
        <button
          onClick={goBack}
          className='rounded-md cursor-pointer flex items-center'
        >
          Back
        </button>
        <IconBtn text="Next" onclick={goToNext}  >
          <BiRightArrow/>
        </IconBtn>
      </div>

    </div>
  )
}

export default CourseBuilderForm