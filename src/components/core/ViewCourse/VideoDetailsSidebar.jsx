import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'
import { setTotalNoOfLectures } from '../../../slices/viewCourseSlice'

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus, setActiveStatus] = useState("")
    const [videoBarActive, setVideoBarActive] = useState("")
    const navigate = useNavigate()
    const {sectionId, subSectionId} = useParams()
    const {
        courseSectionData,
        courseEntireData,
        totalNoOfLectures,
        completedLectures
    } = useSelector((state) => state.viewCourse)

    const location = useLocation()

    useEffect(() => {
        // ;(() => {
           
        // })()

        const setActiveFlags = () => {
            if(!courseSectionData.length)
            return;
            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId) 
            //TODO look more into this findIndex method
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )

            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id

            //set current section here
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)

            //set current subsection here
            setVideoBarActive(activeSubSectionId)
        }
        setActiveFlags()
    },[courseSectionData, courseEntireData, location.pathname])

  return (
    <div>
        <>
            <div className='text-white'>
                {/* for buttons and headings  */}
                <div>
                {/* for buttons  */}
                    <div>
                        <div onClick={() => navigate("/dashboard/enrolled-courses")}>
                            Back
                        </div>

                        <div>
                            <IconBtn 
                                text="Add Review"
                                onclick={() => setReviewModal(true)}
                            />
                        </div>
                    </div>

                    {/* for heading or title  */}
                    <div>
                        <p>{courseEntireData?.courseName}</p>
                        <p>{completedLectures?.length} / {totalNoOfLectures}</p>
                    </div>

                </div>

                {/* for sections and subsections  */}
                <div>
                    {
                        courseSectionData.map((section, index) => {
                           return (<div
                            onClick={() => setActiveStatus(section?._id)}
                            key={index}
                            >
                                {/* section  */}
                                <div>
                                    <div>
                                        {section?.sectionName}
                                    </div>

                                </div>

                                {/* subSections  */}
                                <div>
                                    {
                                        activeStatus === section?._id && (
                                            <div>
                                                {
                                                    section.subSection.map((topic, index) => (
                                                        <div
                                                        key={index}
                                                        className={`flex gap-5 p-5 ${videoBarActive === topic._id 
                                                            ? "bg-yellow-200 text-richblack-900" : "text-white bg-richblack-900"}`}
                                                        onClick={() => {
                                                            navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}
                                                            /sub-section/${topic?._id}`)
                                                            setVideoBarActive(topic?._id)
                                                        }}
                                                        >
                                                            <input 
                                                                type='checkbox'
                                                                checked={completedLectures.includes(topic?._id)}
                                                                onChange={() => {}}    
                                                            />
                                                            <span>
                                                                {topic.title}
                                                            </span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        )})
                    }
                </div>
            </div>
        </>
    </div>
  )
}

export default VideoDetailsSidebar