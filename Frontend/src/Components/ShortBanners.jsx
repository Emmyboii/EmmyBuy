import React from 'react'
import phone from '../assets/Phone.jpg';
import order from '../assets/Order.jpg';
import fashion from '../assets/Women21.jpg';
import accesories from '../assets/accesories.jpg';
import newArrival from '../assets/new.gif';

const ShortBanners = () => {
    return (
        <div className='flex gap-2 bg-white p-3'>
            <div className='flex flex-col gap-2 items-center hover:scale-[1.02] duration-300 cursor-pointer hover:shadow-lg'>
                <img src={phone} className='rounded-md' alt="" />
                <p className='pb-3'>Phone Deals</p>
            </div>
            <div className='flex flex-col gap-2 items-center hover:scale-[1.02] duration-300 cursor-pointer hover:shadow-lg'>
                <img src={newArrival} className='roumded-md' alt="" />
                <p className='pb-3'>New Arrivals</p>
            </div>
            <div className='flex flex-col gap-2 items-center hover:scale-[1.02] duration-300 cursor-pointer hover:shadow-lg'>
                <img src={fashion} className='rounded-md' alt="" />
                <p className='pb-3'>Fashion Deals</p>
            </div>
            <div className='flex flex-col gap-2 items-center hover:scale-[1.02] duration-300 cursor-pointer hover:shadow-lg'>
                <img src={accesories} className='rounded-md' alt="" />
                <p className='pb-3'>Accesories deals</p>
            </div>
            <div className='flex flex-col gap-2 items-center hover:scale-[1.02] duration-300 cursor-pointer hover:shadow-lg'>
                <img src={order} className='rounded-md' alt="" />
                <p className='pb-3'>Get Started</p>
            </div>
        </div>
    )
}

export default ShortBanners