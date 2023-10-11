import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../../services/apiconnector'
import { contactusEndpoint } from '../../services/apis'
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false)
    const {
        register, handleSubmit, reset, 
        formState: {errors, isSubmitSuccessful}
    } = useForm()

    const submitContactForm = async(data) => {
        console.log("loggin data" , data)
        try {
            setLoading(true)
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data)
            const response = {status: "OK "}
            console.log("logging response", response)
            setLoading(false)
        } catch (error) {
            console.log("Error ", error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: ""
            })
        }
    }, [reset,isSubmitSuccessful])
  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
        <div className=' flex flex-col gap-5'> 
        <div className='flex gap-5 '>
            {/* firstname  */}
            <div className='flex flex-col'>
                <label htmlFor='firstname'>First Name: </label>
                <input 
                    type='text'
                    name='firstname'
                    id='firstname'
                    placeholder='Enter first name'
                    className='text-black'
                    {...register("firstname", {required: true})}
                />
                {
                    errors.firstname && (
                        <span>
                            Please enter Your name
                        </span>
                    )
                }
            </div>

            {/* lastname  */}
            <div className='flex flex-col'>
                <label htmlFor='firstname'>Last Name: </label>
                <input 
                    type='text'
                    name='lastname'
                    id='firstname'
                    placeholder='Enter last name'
                    className='text-black'
                    {...register("lastname")}
                />
               
            </div>           
        </div>
         {/* email  */}
            <div className='flex flex-col'>
                <label htmlFor='email'>Email Address</label>
                <input type='email' name='email' id='email' className='text-black' placeholder='Enter email address'
                {...register("email", {required:true})}

                />
                {
                    errors.email && (
                        <span>
                            Please enter your email address 
                        </span>
                    )
                }
            </div>

             {/* phone no     */}
             <div className='flex flex-col gap-2'>
                 <label htmlFor='phonenumber'>Phone Number:</label>
                 <div className='flex flex-row gap-5 justify-between'>
                    {/* dropdown  */}
                  
                        <select
                            name='dropdown'
                            id='dropdown'
                            className='w-[80px] text-black'
                            {...register("countrycode", {required: true})}
                        >
                            {
                                CountryCode.map((element, index) => {
                                    return (
                                        <option className='text-black' key={index} value={element.code}>
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    

                    
                        <input 
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            className='text-black w-[calc(100%-95px)]'
                            {...register("phoneNo", {required: {value:true, message: "Please enter Phone number "},
                                maxLength: {value: 10, message: "Invalid phone number"},
                                minLength: {value: 8, message: "Invalid phone number"}
                            }, )}
                        />
                 </div>
                 {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                 }
             </div>

            {/* message  */}
            <div className='flex flex-col'>
                <label htmlFor='message'>Message:</label>
                <textarea
                name='message'
                id='message'
                cols="30"
                rows="7"
                placeholder='Enter your message here'
                className='text-black'
                {...register("message", {required: true})}
            ></textarea>
            {
                errors.message && (
                    <span>
                        Please enter your message
                    </span>
                )
            }
            </div>
            <button type='submit'
            className='rounded-md bg-yellow-50 text-center px-6 py-2 text-[16px] font-bold text-black'
            >
                Send Message
            </button>
        </div>
    </form>
  )
}

export default ContactUsForm