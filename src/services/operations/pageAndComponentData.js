import React from 'react'
import toast from 'react-hot-toast'
import { catalogData } from '../apis'
import apiConnector from "../apiconnector"

export const getCatalogPageData = async(categoryId) => {
    const toastId = toast.loading("loading....")
    let result = []
    try {
     const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {categoryId: categoryId}) //check if this should've been a GET reqest      
    
    if(!response?.data?.success)
        throw new Error("could not fetch category page data")
    result = response?.data
    } catch (error) {
        console.log("CATALOGPAGEDATA_API", error)
        toast.error(error.message)
        result = error.response?.data      
    }
    toast.dismiss(toastId)
    return result
}
