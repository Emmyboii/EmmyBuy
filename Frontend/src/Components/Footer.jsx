import React from 'react'
import Logo from '../assets/Logo3.jpg';
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <div className='bg-black grid grid-cols-4 text-[#cac9c9] py-5 h-[300px] px-5'>
            <div className='col-span-1'>
                <img className='' src={Logo} width={200} alt="" />
            </div>
            <div className='col-span-3 grid grid-cols-4 gap-[10px]'>
                <div>
                    <p className='font-bold text-[18px]'>ABOUT EMMYBUY</p>
                    <ul>
                        <li>Contact Us</li>
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Our Blog</li>
                        <li>Terms & Conditions</li>
                    </ul>
                </div>
                <div>
                    <p className='font-bold text-[18px]'>PAYMENTS</p>
                    <ul>
                        <li>EmmyPay</li>
                        <li>Wallet</li>
                        <li>Verve</li>
                        <li>Visa</li>
                        <li>Mastacard</li>
                    </ul>
                </div>
                <div>
                    <p className='font-bold text-[18px]'>MORE INFO</p>
                    <ul>
                        <li>Track My Order</li>
                        <li>Privacy Policy</li>
                        <li>FAQs</li>
                        <li>Return Poilicy</li>
                    </ul>
                </div>
                <div>
                    <p className='font-bold text-[18px]'>CONNECT WITH US</p>
                    <ul className='flex gap-3 mt-1'>
                        <li className='text-[26px]'><BsFacebook /></li>
                        <li className='text-[26px]'><AiFillTwitterCircle /></li>
                        <li className='text-[26px]'><FaInstagramSquare /></li>
                        <li className='text-[26px]'><BsYoutube /></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer