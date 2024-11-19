import React from 'react'
import Logo from '../assets/Logo3.jpg';
import Logo2 from '../assets/Logo5.jpg';
import { MdAccountCircle } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  return (
    <div className='bg-red-500 text-white flex items-center justify-between p-5'>
      <img className='absolute top-[14px] left-[15px]' src={Logo2} width={48} alt="" />
      <img className='pl-5' src={Logo} width={200} alt="" />
      <div className='flex gap-2'>
        <input className='border-2 py-3 px-3 w-[100%] max-w-[500px]' type="text" name="" id="" placeholder='Search for a product' />
        <button className='bg-yellow-400'>Search</button>
      </div>
      <div className='flex gap-1 items-center bg-[#f6f6f6] rounded p-[6px] shadow-sm shadow-black cursor-pointer'>
        <p className='text-[30px] text-black'><MdAccountCircle /></p>
        <p className='text-[20px] text-black font-medium'>Account</p>
        <p className='text-[20px] pl-2 text-black'><IoIosArrowDown /></p>
      </div>
    </div>
  )
}

export default Navbar