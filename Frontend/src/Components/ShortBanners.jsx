import React from 'react'
import phone from '../assets/Phone.jpg';
import order from '../assets/BUY-2_updated.gif';
import fashion from '../assets/Women21.jpg';
import accesories from '../assets/accesories.jpg';
import newArrival from '../assets/new.gif';

const ShortBanners = () => {
    return (
        <div className='flex gap-2 bg-white p-3'>
            <div className='flex flex-col gap-2 items-center hover:scale-[1.02] duration-300 cursor-pointer hover:shadow-lg'>
                <img src={phone} className='rounded-md' alt="" />
                <p className='pb-3 text-center'>Phone Deals</p>
            </div>
            <div className='flex flex-col gap-2 items-center hover:scale-[1.02] duration-300 cursor-pointer hover:shadow-lg'>
                <img src={newArrival} className='roumded-md' alt="" />
                <p className='pb-3 text-center'>New Arrivals</p>
            </div>
            <div className='flex flex-col gap-2 items-center hover:scale-[1.02] duration-300 cursor-pointer hover:shadow-lg'>
                <img src={fashion} className='rounded-md' alt="" />
                <p className='pb-3 text-center'>Fashion Deals</p>
            </div>
            <div className='flex flex-col gap-2 items-center hover:scale-[1.02] duration-300 cursor-pointer hover:shadow-lg'>
                <img src={order} className='rounded-md' alt="" />
                <p className='pb-3 text-center'>Get Started</p>
            </div>
            <div className='sm:flex hidden flex-col gap-2 items-center hover:scale-[1.02] duration-300 cursor-pointer hover:shadow-lg'>
                <img src={accesories} className='rounded-md' alt="" />
                <p className='pb-3 text-center'>Accesories deals</p>
            </div>
        </div>
    )
}

export default ShortBanners