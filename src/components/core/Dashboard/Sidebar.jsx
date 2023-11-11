import React, { useState } from 'react'
import { sidebarLinks } from '../../../data/dashboard-links'
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmatonModal from '../../common/ConfirmatonModal'


const Sidebar = () => {
    const {user, loading: profileLoading} = useSelector((state) => state.profile)
    const {loading: authLoading} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [confirmationModal, setConfirmationModal] = useState(null)

        //if the auth data and the profile data hasn't loaded yet then show spinner as we need that data for the dashboard
        if(profileLoading || authLoading){
            return (
                <div className='mt-10'>Loading...</div>
            )
        }

    return (
    <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col">
            <div>
                {
                    sidebarLinks.map((link) =>   {
                        if(link.type && user?.accountType !== link.type) return null;
                        return (
                            <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                        )
                    })
                }
            </div>
            <div className='mx-auto mt-6 mb-6 h-[1px]'></div>

            <div className='flex flex-col '>
                    <SidebarLink 
                        link={{name:"Settings", path: "dashboard/settings"}}
                        iconName="VscSettingsGear"
                    />
                    <button
                    onClick={() => setConfirmationModal({
                        text1: "Are you Sure?",
                        text2: "You will be logged out of account",
                        btn1Text: "Logout",
                        btn2Text: "Cancel",
                        btn1Handler: () => dispatch(logout(navigate)),
                        btn2Handler: () => setConfirmationModal(null),
                    })}
                    className='text-sm font-medium text-richblack-300'
                    >
                        <div className='flex items-center gap-x-2'>
                            <VscSignOut className='text-lg'/>
                            <span>Logout</span>
                        </div>
                    </button>
            </div>
        </div>

        {confirmationModal && <ConfirmatonModal
        modalData={confirmationModal}/>}
    </div>
  )
}

export default Sidebar