import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';

import { IoMdHeart } from "react-icons/io";

const Display = (props) => {
    const { product } = props;
    const { addToCart, saveItem, removeSaveItem, setCartModal, setSavedRemoveModal, setSavedModal } = useContext(ShopContext);

    const [isClicked, setIsClicked] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            localStorage.setItem('pendingSaveItem', product.id);
            navigate('/login');
        } else {
            if (!isClicked) {
                setIsClicked(true);
                saveItem(product.id);
                setSavedModal(true);
            } else {
                setIsClicked(false);
                removeSaveItem(product.id);
                setSavedRemoveModal(true);
            }
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const pendingItemId = localStorage.getItem('pendingSaveItem');

        if (token && pendingItemId) {
            saveItem(pendingItemId);
            setSavedModal(true);
            localStorage.removeItem('pendingSaveItem');
        }
    }, [saveItem, setSavedModal]);

    return (
        <div className='flex flex-col md:flex-row w-full gap-4 px-4'>
            <div className='bg-white flex flex-col md:flex-row gap-6 py-6 w-full md:max-w-[70%] px-6 rounded-lg shadow-md'>
                <img src={product.Image} alt={product.Name} className='object-contain md:w-[40%] w-full rounded-lg' />
                <hr className='md:hidden block' />
                <div className='flex flex-col gap-4 w-full'>
                    <h1 className='text-2xl font-bold'>{product.Name}</h1>
                    <p className='text-gray-500'><span className='font-medium'>Product ID:</span> {product.id}</p>
                    <p className='text-gray-500'><span className='font-medium'>Brand:</span> {product.Brand}</p>
                    <hr />
                    <div className='text-xl font-bold'>
                        <p className='text-orange-500'>₦ {product.New_price}</p>
                        <p className='line-through text-gray-400 text-sm'>₦ {product.Old_price}</p>
                    </div>

                    {product.Category === 'Fashion' && (
                        <div>
                            <p className='text-lg font-semibold'>Select Size</p>
                            <div className='flex flex-wrap gap-3 my-3'>
                                {['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'].map((size) => (
                                    <button key={size} className='border border-gray-400 py-2 px-4 rounded-lg hover:bg-gray-200'>{size}</button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className='flex gap-4'>
                        <button 
                            onClick={() => {
                                addToCart(product.id);
                                setCartModal(true);
                            }}
                            className='bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-lg w-full font-bold'>
                            ADD TO CART
                        </button>
                        <IoMdHeart 
                            className={`text-3xl cursor-pointer ${isClicked ? 'text-orange-400' : 'text-gray-300'} hover:text-orange-500`} 
                            onClick={handleClick} 
                        />
                    </div>
                </div>
            </div>

            <div className='bg-white rounded-lg shadow-md w-full md:w-[30%] py-6 px-6'>
                <h2 className='text-xl font-semibold mb-4'>Delivery & Return</h2>
                <hr className='mb-4' />
                <div>
                    <h3 className='font-medium text-lg'>Delivery</h3>
                    <p className='text-sm text-gray-600'>
                        Estimated delivery time 1-9 business days<br />
                        <span className='font-medium'>For Same-Day Delivery:</span> Order before 11 AM<br />
                        <span className='font-medium'>Next-Day Delivery:</span> After 11 AM orders delivered next day<br />
                        <span className='font-medium'>Note:</span> Availability varies by location
                    </p>
                </div>
                <hr className='my-4' />
                <div>
                    <h3 className='font-medium text-lg'>Return Policy</h3>
                    <p className='text-sm text-gray-600'>
                        <span className='font-medium'>Guaranteed 7-Day Return Policy</span><br />
                        Visit <span className='text-red-500 cursor-pointer'>EmmmyBuy Return Policy</span> for details.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Display;
