import { current } from '@reduxjs/toolkit'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const VideoDetails = () => {

  const {courseId, sectionId, subSectionId} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const player = useRef()
  const {token} = useSelector((state) => state.auth)
  const {courseSectionData, courseEntireData, completedLectures} = useSelector((state) => state.viewCourse)
  const [videoData, setVideoData]  = useState([])
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading,  setLoading] = useState(false)
  const location = useLocation()


  useEffect(() => {
    const setVideoSpecificDetails = () => {
      if(!courseSectionData.length){
        return
      }
      if(!courseId && !sectionId && !subSectionId){
        navigate("/dashboard/enrolled-courses")
      }
      else{
        const filteredData = courseSectionData.filter((course) => course._id === sectionId)

        const filteredVideoData =  filteredData?.[0].subSection.filter((data) => data._id === subSectionId)
        setVideoData(filteredVideoData[0])
        setVideoEnded(false)
      }
    }
    setVideoSpecificDetails()
  },[courseSectionData, courseEntireData, location.pathname])


  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
    
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId) 
    if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
      return true
    }
    else {
      return false    
    }
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length

    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId) 

    if(currentSectionIndex === courseSectionData.length - 1 && currentSubSectionIndex === noOfSubSections - 1){
      return true
    }
    else {
      return false
    }

  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length
     
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId)

    if(currentSubSectionIndex != noOfSubSections - 1){
      //go to the next video in the same section 
      const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id 

      //go to that video
      navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)

    } else {
      //different section's first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
      const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id
      //go to this video
      navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)
    const noOfSubSections = courseSectionData[currentSectionIndex].subSection.length
     
    const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((data) => data._id === subSectionId)

    if(currentSubSectionIndex != 0){
       //same section prev video
       const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id
       //go to this video
       navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)


    }else {
      //different section last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id
      const prevSubSectionLength = courseSectionData[currentSectionIndex - 1].subSection.length
      const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[prevSubSectionLength - 1]._id

       //go to this video
       navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
    }
  }

  const handleLectureCompletion = () => {
    //dummy code
  }



  return (
    <div>

    </div>
  )
}

export default VideoDetails