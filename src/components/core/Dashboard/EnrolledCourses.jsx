import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {getUserEnrolledCourses} from "../../../services/operations/profileAPI" 
import ProgressBar from '@ramonak/react-progress-bar'
import { useNavigate } from 'react-router-dom'

const EnrolledCourses = () => {

    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()


    const [enrolledCourses, setEnrolledCourses] = useState(null)

    const getEnrolledCourses = async() => {
      try {
        const response = await getUserEnrolledCourses(token)
        // Heree the error was that i was passing the token as a parameter but in object format i.e. {token}  
        setEnrolledCourses(response)
      } catch (error) {
        console.log("Unable  to fetch enrolled courses ")
      }  
    }

    useEffect(() => {
      getEnrolledCourses()
    },[])
  return (
    <div className='text-white'>
        <div>Enrolled Courses</div>
          {
            !enrolledCourses ? (
              <div>
                Loading...
              </div>
            ) : !enrolledCourses.length ? (<p>You have not enrolled in any course yet</p>) :
            (
              <div>
                <div>
                  <p>Course Name</p>
                  <p>Durations</p>
                  <p>Progress</p>
                </div>
                {/* Cards start from here  */}
                {
                  enrolledCourses.map((course,i, arr) => {

                    //TODO: loook more into this arr functionality of map
                    return (
                      <div className={`flex items-center border border-richblack-700 ${
                        i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
                      }`}
                      key={i}>
                        <div 
                          onClick={() => {navigate(`/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)}}
                        >
                          <img src={course.thumbnail}/>
                          <div>
                            <p>{course.courseName}</p>
                            <p>{course.courseDescription}</p>
                          </div>
                        </div>
                        <div>
                          {
                            course?.totalDuration
                          }
                        </div>
                        <div>
                           <p>Progress: {course.progressPercentage || 0}%</p>
                           <ProgressBar 
                            completed={course.progressPercentage || 0} 
                            height='8px'
                            isLabelVisible ={false}
                            /> 
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            ) 
          }
        
    </div>
  )
}

export default EnrolledCourses