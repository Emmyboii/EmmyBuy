import React from 'react'
import Samsung from '../assets/Phones Accessories/Samsung_Galaxy_S24_Ultra.png';
import Infinix from '../assets/Phones Accessories/note.jpg';
import Apple from '../assets/Phones Accessories/IPhone_15_Pro_Max.png';
import Ipad from '../assets/Phones Accessories/ipad.png';
import Tecno from '../assets/Phones Accessories/Tecno_CAMON_30.png';
// import Samsung from '../assets/Phones Accessories/Samsung Galaxy S24 Ultra.jpg';

const PhoneDeal = () => {
    return (
        <div>
            <div className='bg-black flex items-center justify-center py-4 text-[25px] font-semibold text-white'>
                <p>Phone Deals</p>
            </div>
            <div className='bg-white px-3 grid grid-cols-5 gap-[10px]'>
                <div className='flex flex-col items-center hover:scale-[1.02] duration-300 text-center py-3'>
                    <img src={Samsung} className='rounded-md' alt="" />
                </div>
                <div className='flex flex-col items-center hover:scale-[1.02] duration-300 text-center rounded-md py-3'>
                    <img src={Apple} className='rounded-md' alt="" />
                </div>
                <div className='flex flex-col items-center hover:scale-[1.02] duration-300 text-center rounded-md py-3'>
                    <img src={Tecno} className='rounded-md' alt="" />
                </div>
                <div className='flex flex-col items-center hover:scale-[1.02] duration-300 text-center rounded-md py-3'>
                    <img src={Ipad} className='rounded-md' alt="" />
                </div>
                <div className='flex flex-col items-center hover:scale-[1.02] duration-300 text-center rounded-md py-3'>
                    <img src={Infinix} className='rounded-md' alt="" />
                </div>
            </div>
        </div>
    )
}

export default PhoneDeal