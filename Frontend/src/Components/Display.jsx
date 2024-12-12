import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'

import { IoMdHeart } from "react-icons/io";

const Display = (props) => {
    const { product } = props
    const { addToCart, saveItem, removeSaveItem } = useContext(ShopContext)

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (isClicked === false) {
            setIsClicked(!isClicked);
            saveItem(product.id)
        } else if (isClicked === true) {
            setIsClicked(!isClicked);
            removeSaveItem(product.id)
        }
    };

    return (
        <div className='grid grid-cols-3 gap-5 mx-7'>
            <div className='bg-white flex gap-3 py-7 pb-[100px] col-span-2 px-5 relative'>
                <img src={product.Image} alt="" className=' object-contain' />
                <div className='flex flex-col gap-3'>
                    <p className='text-[24px] font-bold'>{product.Name}</p>
                    <p><span className='text-[#a19f9f]'>Product id:</span> {product.id}</p>
                    <p><span className='text-[#a19f9f]'>Brand:</span> {product.Brand}</p>
                    <hr />
                    <div className='flex flex-col gap-1 text-[24px] font-bold'>
                        <p># {product.New_price}</p>
                        <p className='line-through text-[#a19f9f] text-[16px] font-medium'># {product.Old_price}</p>
                    </div>

                    {product.Category === 'Fashion' && (
                        <div>
                            <p className='text-[18px] font-semibold'>Select Size</p>
                            <div className='flex border-gray-700 my-3 gap-2'>
                                <button className='border border-gray-700 py-3 px-5'>S</button>
                                <button className='border border-gray-700 py-3 px-5'>M</button>
                                <button className='border border-gray-700 py-3 px-5'>L</button>
                                <button className='border border-gray-700 py-3 px-5'>XL</button>
                                <button className='border border-gray-700 py-3 px-5'>XXL</button>
                                <button className='border border-gray-700 py-3 px-5'>XXXL</button>
                                <button className='border border-gray-700 py-3 px-5'>XXXXL</button>
                            </div>
                        </div>
                    )}
                    <div className='flex'>
                        <button onClick={() => addToCart(product.id)} className='bg-orange-500 h-[50px] w-full text-white font-bold'>ADD TO CART</button>
                        <div className='flex bg-'>
                            <IoMdHeart className={`absolute top-2 right-3 text-2xl cursor-pointer ${isClicked ? 'text-orange-400' : 'text-transparent'} hover:text-orange-400`}
                                style={{
                                    stroke: isClicked ? "orange" : "red",
                                    strokeWidth: 16,
                                }}
                                onClick={handleClick}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-white gap-2 pb-7 rounded-sm'>
                <h1 className='text-[21px] font-semibold px-5 py-2'>Delivery & Return Policy</h1>
                <hr className='bg-black h-[1.5px]' />
                <div className='px-5 pb-1'>
                    <p className='text-[17px] font-semibold py-1'>Delivery</p>
                    <p>
                        Estimated delivery time 1-9 business days
                        <br />
                        Express Delivery Available
                        <br />
                        <span className='font-semibold'>For Same-Day-Delivery:</span> Please place your order before 11AM
                        <br />
                        <span className='font-semibold'>Next-Day-Delivery:</span> Orders placed after 11AM will be delievered the next day
                        <br />
                        <span className='font-semibold'>Note:</span> Availability may vary by location
                    </p>
                </div>
                <hr className='bg-black h-[1.5px]' />
                <div className='px-5'>
                    <p className='text-[17px] font-semibold py-1'>Return Policy</p>
                    <p>
                        <span className='font-semibold'>Guaranteed 7-Day Return Policy</span>
                        <br />
                        For details about return shipping options, please visit -
                        <span className='text-red-500 cursor-pointer'>EmmmyBuy Return Policy</span>
                    </p>
                </div>
            </div>
        </div >
    )
}

export default Display