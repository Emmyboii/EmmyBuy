import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo3.jpg';
import { FaUserCheck, FaUserXmark } from "react-icons/fa6"
import { IoCartSharp } from "react-icons/io5";
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {

  const { getTotalCartItem } = useContext(ShopContext)

  const handleProductClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetch('http://localhost:5000/user/getUsers', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'token': `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json()).then((data) => setUserData(data))
  }, [])

  const [userData, setUserData] = useState({
    lastName: '',
  })

  return (
    <>
      <div className='bg-red-500 sticky top-0 z-50 text-white flex items-center justify-between px-9 py-5'>
        <Link to='/'>
          <img className='' src={Logo} width={200} alt="" />
        </Link>
        <div className='flex gap-3'>
          <input className='ml-[70px] text-black rounded-xl w-[550px] h-[60px] pl-4' type="text" name="" id="" placeholder='Search for products, brands and categories' />
          <button className='bg-orange-500 w-[100px] rounded-xl text-[20px]'>Search</button>
        </div>
        {localStorage.getItem('token') ? (
          <div>
            <Link to='/account/acct_info' onClick={handleProductClick}>
              <button className='flex gap-2 items-center bg-[#f6f6f6] rounded py-[6px] px-2 shadow-sm shadow-black'>
                <p className='text-[30px] text-black/70'><FaUserCheck /></p>
                <p className='text-[20px] text-black/70 font-medium'>Hi, {userData.lastName}</p>
              </button>
            </Link>
          </div>
        ) : (
          <div>
            <Link to='/login' onClick={handleProductClick}>
              <button className='flex gap-2 items-center bg-[#f6f6f6] rounded py-[6px] px-2 shadow-sm shadow-black'>
                <p className='text-[30px] text-black/70'><FaUserXmark /></p>
                <p className='text-[20px] text-black/70 font-medium'>Account</p>
              </button>
            </Link>
          </div>
        )}

        <Link to='/cart' onClick={handleProductClick}>
          <div className='flex items-center gap-1 cursor-pointer relative'>
            <IoCartSharp className='text-[30px]' />
            <p className='text-[20px]'>Cart</p>
            <p className='bg-orange-500 rounded-full px-[6px] absolute top-[-12px] left-[-6px]'>{getTotalCartItem()}</p>
          </div>
        </Link>
      </div>


      <div className='bg-orange-500 sticky top-[100px] z-50 shadow-md shadow-gray-600 py-5 text-white flex items-center justify-center'>
        <ul className='flex gap-20 text-[20px] font-semibold'>
          <Link to={'/phone&accessories'}><li>Phone & Accesories</li></Link>
          <Link to={'/fashion'}><li>Fashion</li></Link>
          <Link to={'/drinks&groceries'}><li>Drinks & Groceries</li></Link>
          <Link to={'/gaming'}><li>Gaming</li></Link>
          <Link to={'/kitchen'}><li>Kitchen</li></Link>
        </ul>
      </div>
    </>
  )
}

export default Navbar