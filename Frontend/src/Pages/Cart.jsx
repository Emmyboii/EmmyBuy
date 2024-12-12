import React, { useContext } from 'react'
import cart from '../assets/cart.svg';
import { Link } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import { RxCross2 } from "react-icons/rx";

const Cart = () => {

    const { cartItem, addToCart, getTotalValue, removeFromCart, removeAllCart, allProduct } = useContext(ShopContext)

    const hasItemsInCart = allProduct.some((item) => cartItem[item.id] > 0);

    if (!hasItemsInCart) {
        return (
            <div className='rounded-lg bg-white m-9'>
                <div className='flex flex-col items-center justify-center py-20 px-[100px] text-center gap-6'>
                    <img src={cart} alt="" />
                    <p className='font-semibold text-[21px]'>Your cart is empty!</p>
                    <p>Browse our categories and discover our best deals!</p>
                    <Link to='/'>
                        <button className='bg-orange-500 text-white p-3 rounded-md'>Start Shopping</button>
                    </Link>
                </div>
            </div>
        );
    }

    const navigateToLogin = () => {
        const currentPage = window.location.pathname; // Get the current path
        localStorage.setItem('previousPage', currentPage); // Save it in localStorage
        window.location.replace('/login'); // Navigate to the login page
    };

    return (
        <div className='bg-white px-5 rounded-lg'>
            <div>
                <div className='grid grid-cols-7 items-center text-center p-4'>
                    <p className='text-start pl-6'>Product</p>
                    <p className='col-span-2'>Name</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <hr className='h-1 bg-gray-400 border-0' />
            </div>
            {allProduct.map((item, i) => {
                if (cartItem[item.id] > 0) {
                    return <div>
                        <div key={i} className='grid grid-cols-7 items-center text-center p-4'>
                            <Link to={`/product/${item.id}`}>
                                <img src={item.Image} className='w-[50%]' alt="" />
                            </Link>

                            <p className='col-span-2 text-start'>{item.Name}</p>
                            <p>{item.New_price}</p>
                            <div className='flex ml-14'>
                                <button className='p-2 border-2 border-r-0 border-black/50 hover:bg-black/10' onClick={() => removeFromCart(item.id)}>-</button>
                                <p className='p-2 border-2 border-black/50'>{cartItem[item.id]}</p>
                                <button className='p-2 border-2 border-l-0 border-black/50 hover:bg-black/10' onClick={() => addToCart(item.id)}>+</button>
                            </div>
                            <p>{item.New_price * cartItem[item.id]}</p>
                            <button className='ml-20 mr-[85px] hover:bg-black/20 rounded-full' onClick={() => removeAllCart(item.id)}><RxCross2 /></button>
                        </div>
                        <hr className='h-[2px] bg-gray-400 border-0' />
                    </div>
                }
                return null
            })}
            <div className="grid grid-cols-2 mt-20 gap-10">
                <div className="cartitems-total">
                    <h1 className='bg-red-500 p-2 text-white text-[19px] font-semibold'>Cart Totals</h1>
                    <div>
                        <div className="flex justify-between p-2">
                            <p>Subtotal</p>
                            <p>${getTotalValue()}</p>
                        </div>
                        <hr />
                        <div className="flex justify-between p-2">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="flex justify-between p-2 font-bold">
                            <h3>Total</h3>
                            <h3>${getTotalValue()}</h3>
                        </div>
                    </div>
                    {localStorage.getItem('token') ? (
                        <button className='p-3 my-4 text-white bg-red-500'>PROCEED TO CHECKOUT</button>
                    ) : (
                        <button onClick={navigateToLogin} className='p-3 my-4 text-white bg-red-500'>PROCEED TO CHECKOUT</button>
                    )}

                </div>
                <div className="ml-10">
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