import React from 'react'
import Samsung from '../assets/samsung.jpg';
import Infinix from '../assets/infinix.jpg';
import Apple from '../assets/apple.jpg';
import Itel from '../assets/itel2.jpg';
import Tecno from '../assets/tecno.jpg';
import Lenovo from '../assets/lenovo.jpg';
import Oraimo from '../assets/oraimo.jpg';
import Itel2 from '../assets/itel.jpg';
import Samsung2 from '../assets/samsung2.jpg';
import Tecno2 from '../assets/tecno2.jpg';

const OfficialStore = () => {
    return (
        <div>
            <div className='bg-black flex items-center justify-center py-4 text-[25px] font-semibold text-white'>
                <p>Official Stores</p>
            </div>
            <div className='bg-white px-3 grid grid-cols-5 py-[10px] gap-[10px]'>
                <div className='flex flex-col items-center hover:scale-[1.02] duration-300 text-center'>
                    <img src={Samsung} className='rounded-md' alt="" />
                </div>
                <div className='flex flex-col items-center hover:scale-[1.02] duration-300 text-center rounded-md'>
                    <img src={Lenovo} className='rounded-md' alt="" />
                </div>
                <div className='flex flex-col items-center hover:scale-[1.02] duration-300 text-center rounded-md'>
                    <img src={Infinix} className='rounded-md' alt="" />
                </div>
                <div className='flex flex-col items-center hover:scale-[1.02] duration-300 text-center rounded-md'>
                    <img src={Tecno} className='rounded-md' alt="" />
                </div>
                <div className='flex flex-col items-center hover:scale-[1.02] duration-300 text-center rounded-md'>
                    <img src={Apple} className='rounded-md' alt="" />
                </div>
                <div className='flex flex-col items-center hover:scale-[1.02] duration-300 text-center rounded-md'>
                    <img src={Itel} className='rounded-md' alt="" />
                </div>
                <div className='flex flex-col items-center hover:scale-[1.02] duration-300 text-center'>
                    <img src={Samsung2} className='rounded-md' alt="" />
                </div>
                <div className='flex flex-col items-center hover:scale-[1.02] duration-300 text-center rounded-md'>
                    <img src={Itel2} className='rounded-md' alt="" />
                </div>
                <div className='flex flex-col items-center hover:scale-[1.02] duration-300 text-center rounded-md'>
                    <img src={Oraimo} className='rounded-md' alt="" />
                </div>
                <div className='flex flex-col items-center hover:scale-[1.02] duration-300 text-center rounded-md'>
                    <img src={Tecno2} className='rounded-md' alt="" />
                </div>
            </div>
        </div>
    )
}

export default OfficialStore