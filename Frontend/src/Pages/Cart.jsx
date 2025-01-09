import React, { useContext, useEffect, useRef } from 'react'
import cart from '../assets/cart.svg';
import { Link } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { RxCross2 } from "react-icons/rx";
import { TiTimes } from "react-icons/ti";
import { CiHeart } from "react-icons/ci";
import { LiaTimesSolid, LiaTimesCircleSolid } from "react-icons/lia";
import { FaRegHeart, FaTrash } from "react-icons/fa";
import { TbCurrencyNaira } from "react-icons/tb";

const Cart = () => {

    const {
        cartItem,
        addToCart,
        getTotalValue,
        removeFromCart,
        allProduct,
        setCartModal,
        setQuantityModal,
        confirmRemoveCart,
        onClickRemoveCart,
        removeAllCart,
        setCartRemoveModal,
        saveItem,
        setSavedModal
    } = useContext(ShopContext)

    useEffect(() => {
        const currentPage = window.location.pathname; // Get the current path
        localStorage.setItem('previousPage', currentPage); // Save it in localStorage
    }, [])

    const navigateToLogin = () => {
        const currentPage = window.location.pathname; // Get the current path
        localStorage.setItem('previousPage', currentPage); // Save it in localStorage
        window.location.replace('/login'); // Navigate to the login page
    };

    const removeCartModal = useRef()

    const closeModal = (e) => {
        if (removeCartModal.current === e.target)
            onClickRemoveCart()
    }

    const removeCart = (item) => {
        removeAllCart(item)
        setCartRemoveModal(true)
        onClickRemoveCart()
    }

    const saveToWishlist = (item) => {
        if (localStorage.getItem('token')) {
            saveItem(item)
            setSavedModal(true)
            onClickRemoveCart()
            window.location.replace('/customer/account/saved_items');
        } else {
            localStorage.setItem('pendingSaveItem', item)
            window.location.replace('/customer/account/saved_items');
        }
    }

    const saveToWishlist2 = (item) => {
        if (localStorage.getItem('token')) {
            saveItem(item)
            setSavedModal(true)
            window.location.replace('/customer/account/saved_items');
        } else {
            localStorage.setItem('pendingSaveItem', item)
            window.location.replace('/customer/account/saved_items');
        }
    }

    useEffect(() => {
        let token = localStorage.getItem('token')
        let pendingItemId = localStorage.getItem('pendingSaveItem')

        if (token && pendingItemId) {
            saveItem(pendingItemId)
            setSavedModal(true)
            localStorage.removeItem('pendingSaveItem');
        }
    }, [saveItem, setSavedModal])



    const hasItemsInCart = allProduct.some((item) => cartItem[item.id] > 0);

    if (!hasItemsInCart) {
        return (
            <div className='rounded-lg bg-white m-9'>
                <div className='flex flex-col items-center justify-center md:py-20 py-[60px] md:px-[100px] px-[25px] text-center gap-6'>
                    <img src={cart} alt="" />
                    <p className='font-semibold text-[21px]'>Your cart is empty!</p>
                    <p>Browse our categories and discover our best deals!</p>
                    <Link onClick={() => window.scrollTo(0, 0)} to='/'>
                        <button className='bg-orange-500 text-white p-3 rounded-md'>Start Shopping</button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='px-2 mm:px-5 rounded-lg m-3'>
            <div className='md:block hidden bg-white rounded-md'>
                <div className='grid lg:grid-cols-7 grid-cols-9 items-center text-center p-4'>
                    <p className='text-start pl-6'>Product</p>
                    <p className='lg:col-span-2 col-span-4'>Name</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr className='h-1 bg-gray-400 border-0' />
            </div>
            {allProduct.map((item, i) => {
                if (cartItem[item.id] > 0) {
                    return <div className='mb-3 md:mb-0 bg-white rounded-md'>
                        <div key={i} className='grid lg:grid-cols-7  md:grid-cols-9 grid-cols-2 items-center text-center p-4'>
                            <Link to={`/product/${item.id}`}>
                                <img src={item.Image} className='w-[50%]' alt="" />
                            </Link>

                            <p className='lg:col-span-2 md:col-span-4 text-start'>{item.Name}</p>
                            <p className='md:block hidden'>{item.New_price}</p>
                            <div className='flex lg:flex-row md:flex-col md:ml-10 gap-2'>
                                <button
                                    onClick={() => {
                                        if (cartItem[item.id] <= 1) return;
                                        removeFromCart(item.id)
                                        setQuantityModal(true)
                                    }}
                                    className={cartItem[item.id] > 1 ? 'size-[40px] flex items-center justify-center text-[27px] text-white bg-orange-500 hover:bg-orange-800 rounded-md' : 'size-[40px] flex items-center justify-center text-[27px] text-white bg-orange-500 opacity-50 rounded-md'}
                                >
                                    -
                                </button>
                                <p className='size-[40px] flex items-center justify-center border-2'>{cartItem[item.id]}</p>
                                <button
                                    className='size-[40px] flex items-center justify-center text-[27px] text-white bg-orange-500 border-black/50 hover:bg-orange-600 rounded-md'
                                    onClick={() => {
                                        addToCart(item.id)
                                        setCartModal(true)
                                    }}
                                >
                                    +
                                </button>
                            </div>
                            <div className='flex flex-col items-center'>
                                <p className='font-bold md:font-normal text-[21px] md:text-[17px]'># {item.New_price * cartItem[item.id]}</p>
                                <p className='text-black/50 text-[17px] flex items-center md:hidden'># {item.New_price} <LiaTimesSolid /> {cartItem[item.id]}</p>
                            </div>
                            <button
                                className='lg:ml-20 ml-10 mr-[85px] md:block hidden hover:bg-black/20 rounded-full'
                                onClick={() => onClickRemoveCart()}><RxCross2 />
                            </button>
                        </div>
                        <hr className='md:hidden block' />
                        <div className='md:hidden flex items-center justify-between text-center sm:px-20 px-3 py-5 mm:text-[18px]'>
                            <p onClick={() => saveToWishlist2(item.id)} className='border-2 border-black rounded-md p-2 flex items-center gap-2 cursor-pointer'><CiHeart /> Save For Later</p>
                            <p onClick={() => onClickRemoveCart()} className='border-2 border-black rounded-md p-2 flex items-center gap-2 cursor-pointer'><LiaTimesCircleSolid />Remove Item</p>
                        </div>
                        <hr className='h-[2px] bg-gray-400 border-0 md:block hidden' />

                        {confirmRemoveCart && (
                            <div ref={removeCartModal} onClick={closeModal} className='bg-black/40 fixed flex items-center justify-center z-50 inset-0 bg-opacity-30 backdrop-blur-[1.5px]'>
                                <div className='sm:w-[50%] sd:w-[80%] w-[90%] bg-white flex flex-col justify-center p-5 shadow-md shadow-black/50 relative'>
                                    <h1 className='font-bold text-[20px] pb-2'>Remove from cart</h1>
                                    <p>Do you really want to remove this item from cart?</p>
                                    <div className='flex sm:gap-9 gap-4 mt-7 text-white'>
                                        <button onClick={() => saveToWishlist(item.id)} className='w-full text-red-500 border-2 border-red-500 py-3 rounded-md flex items-center justify-center gap-2'><FaRegHeart /> Save for later</button>
                                        <button onClick={() => removeCart(item.id)} className='w-full bg-red-500 py-3 rounded-md flex items-center justify-center gap-2'><FaTrash /> Remove Item</button>
                                    </div>
                                    <TiTimes onClick={() => onClickRemoveCart()} className='absolute top-1 right-2 size-[25px] cursor-pointer' />
                                </div>
                            </div>
                        )}

                    </div>
                }
                return null
            })}
            <div className="grid mk:grid-cols-2 py-10 px-5 rounded-md gap-10 bg-white my-10">
                <div className="cartitems-total">
                    <h1 className='bg-red-500 p-2 text-white text-[19px] font-semibold'>Cart Totals</h1>
                    <div>
                        <div className="flex justify-between p-2">
                            <p>Subtotal</p>
                            <p className='flex items-center'><TbCurrencyNaira className='text-[21px]' />{getTotalValue()}</p>
                        </div>
                        <hr />
                        <div className="flex justify-between p-2">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="flex justify-between p-2 font-bold">
                            <h3>Total</h3>
                            <h3 className='flex items-center'><TbCurrencyNaira className='text-[21px]' />{getTotalValue()}</h3>
                        </div>
                    </div>
                    {localStorage.getItem('token') ? (
                        <button className='p-3 my-4 text-white bg-red-500'>PROCEED TO CHECKOUT</button>
                    ) : (
                        <button onClick={navigateToLogin} className='p-3 my-4 text-white bg-red-500'>PROCEED TO CHECKOUT</button>
                    )}

                </div>
                <div className="mk:ml-10">
                    <p>If you have a promo Code, Enter it here</p>
                    <div className="">
                        <input type="text" placeholder='promo code' className='w-[300px] outline-none bg-gray-300 p-2' />
                        <button className='p-2 px-10 text-white bg-black'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart