import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Instructor = () => {

    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState(null)
    const [courses, setCourses] = useState([])


    useEffect(() => {
        const getCourseDataWithStats = async() => {
            setLoading(true)
            // const instructorApiData = await
        }
    },[])
  return (
    <div>Instructor</div>
  )
}

export default Instructor