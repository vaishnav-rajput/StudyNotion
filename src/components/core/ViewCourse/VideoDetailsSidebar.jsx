import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom'
import IconBtn from '../../common/IconBtn'

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
        ;(() => {
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
        })()
    },[courseSectionData, courseEntireData, location.pathname])

  return (
    <div>
        <>
            <div>
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
                        courseSectionData?.map((section, index) => {
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
                                                        <div></div>
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