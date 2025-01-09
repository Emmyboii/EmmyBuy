import React from 'react'
import UserAcctNavbar from '../Components/UserAccountDeatails/UserAcctNavbar'
import UserAcctSidebar from '../Components/UserAccountDeatails/UserAcctSidebar'
import UserAccountDetails from '../Components/UserAccountDeatails/UserAccountDetails'
import Login from './Login'
import UserSideBar from '../Components/UserAccountDeatails/UserSideBar'

const UserAccount = () => {
    return (
        <>
            {localStorage.getItem('token') ? (
                <div>
                    <UserAcctNavbar name='Account Information' />
                    <UserSideBar />
                    <div className='flex w-full mm:px-10 px-4 gap-[15px]'>
                        <UserAcctSidebar />
                        <UserAccountDetails />
                    </div>
                </div>
            ) : (
                <Login />
            )}
        </>
    )
}

export default UserAccount