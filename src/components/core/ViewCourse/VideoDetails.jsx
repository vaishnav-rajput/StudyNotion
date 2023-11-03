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
    
  }

  const isLastVideo = () => {

  }

  const goToNextVideo = () => {

  }

  const goToPrevVideo = () => {

  }

  const handleLectureCompletion = () => {

  }



  return (
    <div>

    </div>
  )
}

export default VideoDetails