import React from 'react'
import { IoIosArrowForward } from "react-icons/io";

const UserAcctNavbar = (props) => {
    return (
        <div className='bg-white px-5 flex flex-col gap-4 py-5 shadow-md'>
            <div className='flex items-center gap-1'>
                Home
                <IoIosArrowForward className='mt-[2px]' />
                My Account
                <IoIosArrowForward className='mt-[2px]' />
                {props.name}
            </div>
            <p className='text-[30px] font-bold'>{props.name}</p>
        </div>
    )
}

export default UserAcctNavbar