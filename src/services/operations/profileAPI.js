import {profileEndpoints}  from "../apis"
import apiConnector from "../apiconnector"
const {GET_USER_DETAILS_API,GET_USER_ENROLLED_COURSES_API} = profileEndpoints
import { toast } from "react-hot-toast"
import { setLoading, setUser } from "../../slices/profileSlice"

export async function getUserEnrolledCourses(token){
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET", GET_USER_ENROLLED_COURSES_API,null,{
            Authorization: `Bearer ${token}`
        })

        if(!response.data.success){
            throw new Error(response.data.message)
        }
    } catch (error) {
        console.log("getUserEnrolledCourses Error............", error)
        toast.error("couldn't fetch enrolled courses")
    }
    toast.dismiss(toastId)
}