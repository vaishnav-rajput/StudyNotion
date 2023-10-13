import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSection: [],
    courseEntireData: [],
    completedLectures: [],
    totalNoOfLecures: 0,
}

const viewCourseSlice = createSlice({
    name: "viewCourse",
    initialState,
    reducers: {
        setCourseSectionData: (state, action) => {
            state.setCourseSectionData = action.payload
        },
        setEntireCourseData: (state, action) => {
            state.courseEntireData = action.payload
        },
        setTotalNoOfLectures: (state, action) => {
            state.totalNoOfLecures = action.payload
        },
        setCompletedLectures: (state, action) => {
            state.completedLectures = action.payload
        },
        updateCompletedLectures: (state, action) => {
            state.completedLectures = [...state.completedLectures, action.payload]
        }
    }  
})

export const {setCourseSectionData, 
            setEntireCourseData, 
            setTotalNoOfLectures,
            setCompletedLectures,
            updateCompletedLectures
        } = viewCourseSlice.reducer