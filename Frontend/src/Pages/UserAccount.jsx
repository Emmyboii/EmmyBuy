import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import UserAcctNavbar from '../Components/UserAccountDeatails/UserAcctNavbar'
import UserAcctSidebar from '../Components/UserAccountDeatails/UserAcctSidebar'
import UserAccountDetails from '../Components/UserAccountDeatails/UserAccountDetails'
import UserSideBar from '../Components/UserAccountDeatails/UserSideBar'

const UserAccount = () => {

    const location = useLocation()

    useEffect(() => {
        const currentPage = window.location.pathname; // Get the current path
        localStorage.setItem('previousPage', currentPage); // Save it in localStorage
    }, [location])

    return (
        <>
            <div>
                <UserAcctNavbar name='Account Information' />
                <UserSideBar />
                <div className='flex w-full mm:px-10 px-4 gap-[15px]'>
                    <UserAcctSidebar />
                    <UserAccountDetails />
                </div>
            </div>
        </>
    )
}

export default UserAccount