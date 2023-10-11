import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useSearchParams } from 'react-router-dom'
import Sidebar from '../components/core/Dashboard/Sidebar'

const Dashboard = () => {

    const {loading: authLoading} = useSelector((state) => state.auth)
    const {loading: profileLoading} = useSelector((state) => state.profile)

    //if the auth data and the profile data hasn't loaded yet then show spinner as we need that data for the dashboard
    if(profileLoading || authLoading){
        return (
            <div className='mt-10'>Loading...</div>
        )
    }

  return (
    <div className='relative flex min-h-[calc(100vh - 3.5rem)]'>
        <Sidebar/>
        <div className='h-[calc(100vh-3.5rem)] overflow-auto'>
            <div className='mx-auto w-11/12 max-w-[1000px] py-10'>
                <Outlet/>
                {/* TODO: learn more about Outlet and it's usage  */}
            </div>
        </div>
    </div>
  )
}

export default Dashboard