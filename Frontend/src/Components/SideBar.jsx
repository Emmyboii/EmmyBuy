import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo3.jpg';
import { IoIosArrowForward } from "react-icons/io";
import { FaTimes, FaRegHeart } from "react-icons/fa";
import { IoWalletOutline } from "react-icons/io5";
import { FiInbox } from "react-icons/fi";
import { ShopContext } from '../Context/ShopContext'

const SideBar = () => {

    const { sideBar, onClickMenu } = useContext(ShopContext)

    useEffect(() => {
        if (sideBar) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Clean up function to reset overflow on unmount
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [sideBar]);

    const onClick = () => {
        window.scroll(0, 0)
        onClickMenu()
    }

    return (
        <div className={sideBar ? 'fixed md:hidden top-0 left-0 w-[300px] text-[18px] h-screen z-50 duration-500 shadow-md shadow-black bg-orange-500 text-white' : 'fixed top-0 left-[-100%] w-[50%] h-screen z-50 duration-500 shadow-md shadow-black'}>
            <div className='flex items-center gap-2 p-3'>
                <FaTimes onClick={onClick} className='text-[24px] cursor-pointer text-white' />
                <Link to='/'>
                    <img onClick={onClick} className='max-w-[200px]' src={Logo} alt="" />
                </Link>
            </div>
            <hr />
            <div className='flex items-center justify-between mt-3 p-4'>
                {localStorage.getItem('token') ? (
                    <div onClick={onClick}>
                        <Link to='customer/account/acct_info'>
                            <p>MY EMMYBUY ACCOUNT</p>
                        </Link>
                    </div>
                ) : (
                    <div onClick={onClick}>
                        <Link to='/login'>
                            <p>MY EMMYBUY ACCOUNT</p>
                        </Link>
                    </div>
                )}
                <IoIosArrowForward />
            </div>

            <div className='flex flex-col gap-1 p-4'>
                <Link onClick={onClick} to={'customer/account/orders'}>
                    <p className='flex items-center gap-2'>
                        <FiInbox />
                        Orders
                    </p>
                </Link>
                <Link onClick={onClick} to={'customer/account/saved_items'}>
                    <p className='flex items-center gap-2'>
                        <FaRegHeart />
                        Saved Items
                    </p>
                </Link>
                <Link onClick={onClick} to={'customer/account/wallet'}>
                    <p className='flex items-center gap-2'>
                        <IoWalletOutline />
                        Walllet
                    </p>
                </Link>
            </div>
            <hr />
            <div className='flex flex-col gap-1 p-4'>
                <p className='font-bold'>CATEGORIES</p>
                <ul className='flex flex-col gap-1'>
                    <Link onClick={onClick} to={'/phone&accessories'}>
                        <li>
                            Phone & Accesories
                        </li>
                    </Link>
                    <Link onClick={onClick} to={'/fashion'}>
                        <li>
                            Fashion
                        </li>
                    </Link>
                    <Link onClick={onClick} to={'/drinks&groceries'}>
                        <li>
                            Drinks & Groceries
                        </li>
                    </Link>
                    <Link onClick={onClick} to={'/gaming'}>
                        <li>
                            Gaming
                        </li>
                    </Link>
                    <Link onClick={onClick} to={'/kitchen'}>
                        <li>
                            Kitchen
                        </li>
                    </Link>
                </ul>
            </div>
            <hr />
            <div className='flex flex-col gap-1 p-4'>
                <p>Sell on Emmybuy</p>
                <p>Service Center</p>
                <p>Contanct Us</p>
            </div>
        </div>
    )
}

export default SideBar