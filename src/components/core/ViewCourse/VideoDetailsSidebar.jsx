import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const VideoDetailsSidebar = () => {

    const [activeStatus, setActiveStatus] = useState("")
    const [videobarActive, setVideoBarActive] = useState("")
    const navigate = useNavigate()
    const {sectionId, subSectionId} = useParams()
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse)

  return (
    <div>

    </div>
  )
}

export default VideoDetailsSidebar