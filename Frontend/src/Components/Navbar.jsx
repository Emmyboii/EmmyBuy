import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Logo from '../assets/Logo3.jpg';
import { FaUserCheck, FaUserXmark } from "react-icons/fa6"
import { IoCartSharp, IoMenu } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { ShopContext } from '../Context/ShopContext';

const Navbar = () => {

  const { getTotalCartItem, query, handleSearch, handleChange, handleKeyDown, onClickMenu, sideBar } = useContext(ShopContext)

  const handleProductClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/user/getUsers`, {
      method: 'GET',
      headers: {
        'token': `${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
    }).then((res) => res.json()).then((data) => setUserData(data))
  }, [])

  const [userData, setUserData] = useState({
    lastName: '',
  })

  return (
    <>
      <div className='bg-red-500 sticky top-0 z-50 text-white sr:px-7 px-3 py-3 flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <IoMenu onClick={onClickMenu} className='md:hidden block text-[24px] cursor-pointer' />
            <Link to='/'>
              <img onClick={() => window.scroll(0, 0)} className='max-w-[200px]' src={Logo} alt="" />
            </Link>
          </div>

          <div className='md:flex hidden'>
            <input
              className='text-black rounded-xl lg:w-[500px] md:w-[400px] ms:w-[450px] outline-none h-[50px] pl-4'
              type="text"
              value={query}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder='Search for products, brands and categories'
            />
            <button onClick={handleSearch} className='bg-orange-500 w-[50px] flex items-center justify-center ml-[-20px] rounded-r-xl text-[20px]'><FaSearch /></button>
          </div>

          <div className='hidden xl:block'>
            {localStorage.getItem('token') ? (
              <div>
                <Link to='customer/account/acct_info' onClick={handleProductClick}>
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
          </div>

          <Link to='/cart' onClick={handleProductClick}>
            <div className='xl:items-center gap-1 cursor-pointer relative hidden xl:flex'>
              <IoCartSharp className='text-[30px]' />
              <p className='text-[20px]'>Cart</p>
              <p className='bg-orange-500 rounded-full px-[6px] absolute top-[-12px] left-[-6px]'>{getTotalCartItem()}</p>
            </div>
          </Link>

          <div className='xl:hidden flex sr:flex-row flex-col items-center sr:gap-2 gap-3'>
            {localStorage.getItem('token') ? (
              <div>
                <Link to='customer/account/acct_info' onClick={handleProductClick}>
                  <button className='flex gap-2 items-center rounded py-[6px] px-2'>
                    <p className='text-[30px] text-white'><FaUserCheck /></p>
                  </button>
                </Link>
              </div>
            ) : (
              <div>
                <Link to='/login' onClick={handleProductClick}>
                  <button className='flex gap-2 items-center rounded py-[6px] px-2'>
                    <p className='text-[30px] text-white'><FaUserXmark /></p>
                  </button>
                </Link>
              </div>
            )}

            <Link to='/cart' onClick={handleProductClick}>
              <div className='flex items-center gap-1 cursor-pointer relative'>
                <IoCartSharp className='text-[30px]' />
                <p className='bg-orange-500 rounded-full px-[6px] absolute top-[-12px] left-[-6px]'>{getTotalCartItem()}</p>
              </div>
            </Link>
          </div>
        </div>

        <div className='flex md:hidden'>
          <input
            className='text-black rounded-xl w-full outline-none h-[50px] pl-4'
            type="text"
            value={query}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder='Search for products, brands and categories'
          />
          <button onClick={handleSearch} className='bg-orange-500 w-[50px] flex items-center justify-center ml-[-30px] rounded-r-xl text-[20px]'><FaSearch /></button>
        </div>
      </div>


      <div className='bg-orange-500 sticky top-[90px] z-50 shadow-md shadow-gray-600 py-5 text-white md:flex hidden items-center justify-center'>
        <ul className='flex ms:gap-20 md:gap-10 text-[20px] font-semibold'>
          <Link onClick={() => window.scroll(0, 0)} to={'/phone&accessories'}><li>Phone & Accesories</li></Link>
          <Link onClick={() => window.scroll(0, 0)} to={'/fashion'}><li>Fashion</li></Link>
          <Link onClick={() => window.scroll(0, 0)} to={'/drinks&groceries'}><li>Drinks & Groceries</li></Link>
          <Link onClick={() => window.scroll(0, 0)} to={'/gaming'}><li>Gaming</li></Link>
          <Link onClick={() => window.scroll(0, 0)} to={'/kitchen'}><li>Kitchen</li></Link>
        </ul>
      </div>

      {sideBar ? <div onClick={onClickMenu} className='bg-black/80 md:hidden w-full fixed h-screen z-50 top-0 left-0'></div> : ''}

    </>
  )
}

export default Navbar