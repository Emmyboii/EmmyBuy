import React, { useContext, useEffect } from 'react'
import { FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'

const UserSideBar = () => {

    const { onClickSignOut, userSideBar, onClickUserAcctMenu } = useContext(ShopContext)

    useEffect(() => {
        if (userSideBar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Clean up function to reset overflow on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [userSideBar]);

    return (
        <div className={userSideBar ? 'w-[300px] h-screen rounded-r-md bg-white flex flex-col mq:hidden fixed left-0 top-[156px]  z-50 duration-700 shadow-md shadow-black' : 'w-[300px] h-screen rounded-lg bg-white flex flex-col mq:hidden fixed left-[-100%] top-0 z-50 duration-700 shadow-md shadow-black'}>
            <FaTimes onClick={onClickUserAcctMenu} className='text-[24px] cursor-pointer absolute right-2 top-3' />
            <div className='flex flex-col gap-1 px-4 py-4'>
                <h1 className='text-[20px] font-bold'>My Profile</h1>
                <Link to={'./acct_info'}>
                    <p onClick={onClickUserAcctMenu}>Account Information</p>
                </Link>
                <Link to={'./address'}>
                    <p onClick={onClickUserAcctMenu}>Delivery Address</p>
                </Link>
            </div>

            <hr />
            <div className='flex flex-col gap-1 px-4 py-4'>
                <h1 className='text-[20px] font-bold'>My Orders</h1>
                <Link to={'./orders'}>
                    <p onClick={onClickUserAcctMenu}>Orders</p>
                </Link>
                <Link to={'./saved_items'}>
                    <p onClick={onClickUserAcctMenu}>Saved Items</p>
                </Link>
            </div>
            <hr />
            <div className='px-4 py-4 gap-1 flex flex-col'>
                <h1 className='text-[20px] font-bold'>My Wallet</h1>
                <Link to={'./wallet'}>
                    <p onClick={onClickUserAcctMenu}>Walllet</p>
                </Link>
            </div>
            <hr />
            <div className='px-4 py-4 gap-1 flex flex-col'>
                <h1 className='text-[20px] font-bold'>Delete Account</h1>
                <Link to={'./delete_acct'}>
                    <p onClick={onClickUserAcctMenu}>Delete Account</p>
                </Link>
            </div>
            <button onClick={onClickSignOut} className='bg-red-500 text-white text-[18px] w-[100px] mx-auto mt-10 py-2 rounded-lg'>Sign Out</button>
        </div>
    )
}

export default UserSideBar