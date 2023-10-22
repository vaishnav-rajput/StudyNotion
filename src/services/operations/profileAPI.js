import {profileEndpoints}  from "../apis"
import {apiConnector} from "../apiconnector"
import { toast } from "react-hot-toast"
import { setLoading, setUser } from "../../slices/profileSlice"

const {GET_USER_DETAILS_API,GET_USER_ENROLLED_COURSES_API} = profileEndpoints
 
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

        result = response.data.data     
    } catch (error) {
        console.log("getUserEnrolledCourses Error............", error)
        toast.error("Couldn't Fetch enrolled courses")
    }
    toast.dismiss(toastId)
    return result
}