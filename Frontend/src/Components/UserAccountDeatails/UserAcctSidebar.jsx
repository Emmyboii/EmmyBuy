import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const UserAcctSidebar = () => {

    const { onClickSignOut } = useContext(ShopContext)

    return (
        <div className='w-[30%] h-[700px] rounded-lg bg-white my-9 mq:flex flex-col hidden'>
            <div className='flex flex-col gap-1 px-4 py-4'>
                <h1 className='text-[20px] font-bold'>My Profile</h1>
                <Link to={'./acct_info'}>
                    <p>Account Information</p>
                </Link>
                <Link to={'./address'}>
                    <p>Delivery Address</p>
                </Link>
            </div>
            <hr />
            <div className='flex flex-col gap-1 px-4 py-4'>
                <h1 className='text-[20px] font-bold'>My Orders</h1>
                <Link to={'./orders'}>
                    <p>Orders</p>
                </Link>
                <Link to={'./saved_items'}>
                    <p>Saved Items</p>
                </Link>
            </div>
            <hr />
            <div className='px-4 py-4 gap-1 flex flex-col'>
                <h1 className='text-[20px] font-bold'>My Wallet</h1>
                <Link to={'./wallet'}>
                    <p>Walllet</p>
                </Link>
            </div>
            <hr />
            <div className='px-4 py-4 gap-1 flex flex-col'>
                <h1 className='text-[20px] font-bold'>Delete Account</h1>
                <Link to={'./delete_acct'}>
                    <p>Delete Account</p>
                </Link>
            </div>
            <button onClick={onClickSignOut} className='bg-red-500 text-white text-[18px] w-[100px] mx-auto mt-10 py-2 rounded-lg'>Sign Out</button>
        </div>
    )
}

export default UserAcctSidebar