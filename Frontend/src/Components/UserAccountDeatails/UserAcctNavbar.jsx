import React, { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { IoIosArrowForward } from "react-icons/io";
import { IoMenu } from "react-icons/io5";

const UserAcctNavbar = (props) => {

    const { onClickUserAcctMenu, userSideBar } = useContext(ShopContext)

    return (
        <div className='bg-white px-5 flex flex-col gap-4 py-5 shadow-md'>
            <div className='flex items-center gap-1'>
                <p className='text-[15px] text-center'>Home</p>
                <IoIosArrowForward className='mt-[2px]' />
                <p className='text-[15px] text-center'>My Account</p>
                <IoIosArrowForward className='mt-[2px]' />
                <p className='text-[15px] text-center'>{props.name}</p>
            </div>
            <div className='flex gap-2 items-center'>
                <IoMenu onClick={onClickUserAcctMenu} className='mq:hidden block text-[24px] cursor-pointer' />
                <p className='sm:text-[30px] text-[25px] font-bold'>{props.name}</p>
            </div>

            {userSideBar ? <div onClick={onClickUserAcctMenu} className='bg-black/80 md:hidden w-full fixed h-screen z-50 top-[156px] left-0'></div> : ''}

        </div>
    )
}

export default UserAcctNavbar