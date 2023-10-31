import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import copy from "copy-to-clipboard"
import {toast} from "react-hot-toast"
import {ACCOUNT_TYPE} from "../../../utils/constants"
import { addToCart } from '../../../slices/cartSlice'

const CourseDetailsCard = ({course, setConfirmationModal, handleBuyCourse}) => {

    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {
            thumbnail: ThumbnailImage, 
            price: CurrentPrice

    } = course

    const handleAddToCart = () => {
        if(user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR){
            toast.error("You are an instructor, you can't buy a course")
            return
        }
        if(token) {
            dispatch(addToCart(course))
            return
        }
        setConfirmationModal({
            text1: "You are not logged in",
            text2: "Please login to add to cart",
            btn1Text: "login",
            btn2Text: "cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setConfirmationModal(null)
        })
    }

    const handleShare = () => {
        copy(window.location.href) 
        toast.success("Link copied to clipboard")
    }

    return (
    <div>
        <img 
            src={ThumbnailImage}
            alt='Thumbnail Image'
            className='max-h-[300px] min-h-[180px] w-[400px] rounded-xl'
        />
        <div>
            Rs. {CurrentPrice}
        </div>
        <div className="flex flex-col gap-y-5">
            <button className='w-fit bg-yellow-50 text-richblack-800 p-1' onClick={
                user && course?.studentsEnrolled.includes(user?._id) 
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse   
            }>
                {
                    user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"
                }
            </button>

            {
                (!course?.studentsEnrolled.includes(user?._id) && (
                    <button className='w-fit bg-yellow-50 text-richblack-800 p-1' onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                ))
            }
        </div>
        <div>
            <p>30 day money back guarantee</p>
            <p>
                This course Includes:  
            </p>
            <div className='flex flex-col gap-y-3'>
                {
                    course?.instructions?.map((item, index) => (
                        <p key={index} className='flex gap-2'>
                            <span>{item}</span>
                        </p>
                    ))
                }
            </div>
        </div>
        <div className='mx-auto flex items-center gap-2 p-6 text-yellow-50'>
            <button onClick={handleShare}>
                Share
            </button>
        </div>
    </div>
  )
}

export default CourseDetailsCard