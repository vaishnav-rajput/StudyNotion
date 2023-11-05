import React from 'react'
import { useState } from 'react'
import {Chart, registrables} from "chart.js"
import {Pie} from "react-chartjs-2"
import CoursesTable from '../InstructorCourses/CoursesTable'

Chart.register(...registrables)

const InstructorChart = ({courses}) => {

    const [currChart , setCurrChart] = useState("students")

    //function to generatee random colors
    const getRandomColors = (numColors) => {
        const colors = []
        for(let i=0; i<numColors; i++ ){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`
            colors.push(color)
        }
        return colors
    }

    //create data for chart displaying student info
    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled ),
                backgroundColor: getRandomColors(courses.length) 
            },
        ]
    }

    //create data for chart displaying income info
    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName)
    }

    //create options 


  return (
    <div>

    </div>
  )
}

export default InstructorChart