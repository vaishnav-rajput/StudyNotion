import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {   useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI'
import { setCourse } from '../../../../../slices/courseSlice'
import {RxCross1} from "react-icons/rx"
import {toast} from "react-hot-toast"

const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false
}) => {

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors},
        getValues,
    } = useForm()

    const dispatch = useDispatch()
    const [loading, setLoading] =  useState(false)
    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)

    useEffect(() => {
        if(view || edit){
            setValue("lectureTitle", modalData.title) 
            setValue("lectureDescription", modalData.description) 
            setValue("video", modalData.videoUrl) 
        }
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues()
        if(currentValues.lectureTitle !== modalData.title || 
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl 
            ){ 
                return true;
            }
        else {
            return false;
        }    

    }

    const handleEditSubSection = async() => {
        const currentValues = getValues()
        const formData = new FormData()

        formData.append("sectionId", modalData.sectionId)
        formData.append("subSectionId", modalData._id)

        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title", currentValues.lectureTitle)
        }

        if(currentValues.lectureDesc !== modalData.description){
            formData.append("description" , currentValues.lectureDesc)
        }

        if(currentValues.lectureVideo !== modalData.videoUrl){
            formData.append("video", currentValues.lectureVideo)
        }

        setLoading(true)

        //API call
        const result = await updateSubSection(formData, token)

        if(result){
            //TODO: updation 
            dispatch(setCourse())
        }

        setModalData(null)
        setLoading(false)

    }

    const onSubmit = async(data) => {
        if(view)
            return;
        if(edit){
            if(!isFormUpdated){
                toast.error("No changes made to the form")
            }
            else {
                //edit kro
                handleEditSubSection()
            }
            return
        }

        const formData = new FormData()
        formData.append("sectionId", modalData) 
        // Since we passed sectionId in the addSubSection in Nested view component 
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("video", data.lectureVideo)
        setLoading(true)
        //Api call
        const result = await createSubSection(formData, token)

        if(result){
            //TODO: check for updation
            dispatch(setCourse(result))
        }
        setModalData(null)
        setLoading(false)
    }

    return (
    <div>
        <div>
            <div>
                <p>{view && "Viewing"}{add && "Adding"}{edit && "Editing"} Lecture</p>
                <button onClick={() => (!loading ? setModalData(null) : {})}>
                    <RxCross1/>
                </button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>

            </form>
        </div>
    </div>
  )
}

export default SubSectionModal