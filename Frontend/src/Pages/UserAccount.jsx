import React from 'react'
import UserAcctNavbar from '../Components/UserAccountDeatails/UserAcctNavbar'
import UserAcctSidebar from '../Components/UserAccountDeatails/UserAcctSidebar'
import UserAccountDetails from '../Components/UserAccountDeatails/UserAccountDetails'

const UserAccount = () => {
    return (
        <div>
            <UserAcctNavbar name='Account Information' />
            <div className='flex gap-[15px]'>
                <UserAcctSidebar />
                <UserAccountDetails />
            </div>
        </div>
    )
}

export default UserAccount