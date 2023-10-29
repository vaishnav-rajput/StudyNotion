import { apiConnector } from "../apiconnector";
import { studentEndpoints } from "../apis";
import {toast} from "react-hot-toast"
import rzpLogo from "../../assets/Logo/rzp_logo.png"
import { paymentSuccessEmail } from "../../../server/mail/templates/paymentSuccessEmail";
import { setPaymentLoading , resetCart} from "../../slices/courseSlice";


const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints

//load the razorpay script
function loadScript(src){
    return new Promise((resolve) => {
        const script = document.createElement("script")
        script.src = src;

        script.onload = () => {
            resolve(true)
        }

        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch ){
    const toastId = toast.loading("Loading...")
    try {
        //load the script
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js")

        if(!res) {
            toast.error("Razorpay SDK failed to load")
            return
        }

        //initiate the order
        const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
                                {courses},
                                {
                                    Authorization: `Bearer ${token}`
                                }
                                )
        if(!orderResponse.data.success){
            throw new Error(orderResponse.data.message)
        }                        

        //options
        const options = {
            key:process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount:`${orderResponse.data.data.amount}`,
            order_id:orderResponse.data.data.id,
            name:"StudyNotion",
            description:"Thank you for purchasing the course",
            image:rzpLogo,
            prefill:{
                name: `${userDetails.firstName}`,
                email: userDetails.email
            },
            handler: function (response) {
                //send successful email
                sendPaymentSuccessEmail(response, orderResponse.data.data.amount ,token)
                //verifyPayment
                verifyPayment({...response, courses}, token, navigate, dispatch)
            }
        }

    } catch (error) {
        console.log("PAYMENT API ERROR", error)
        toast.error("Could not make payment")
    }
    toast.dismiss(toastId)
}

async function sendPaymentSuccessEmail(response, amount, token){
    try {
        await apiConnector("POST",SEND_PAYMENT_SUCCESS_EMAIL_API,{
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount,
        }, {
            Authorization: `Bearer ${token}`
        })
    } catch (error) {
        console.log("PAYMENT SUCCESS EMAIL API ERROR....", error )
    }
}

//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("verifying payment...");
    dispatch(setPaymentLoading(true))
    try {
        const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
            Authorization: `Bearer ${token}`,
        })

        if(!response.data.success){
            throw new Error(response.data.message)
        }
        toast.success("payment successful, you are added to the course")
        navigate("/dashboard/enrolled-courses")
        dispatch(resetCart())
    } catch (error) {
        console.log("PAYMENT VERIFY ERROR.." , error)
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}