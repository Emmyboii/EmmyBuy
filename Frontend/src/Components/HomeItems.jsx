import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'
import { IoMdHeart } from "react-icons/io";
import { TbCurrencyNaira } from "react-icons/tb";

const HomeItems = (props) => {

    const { saveItem, removeSaveItem, setSavedModal, setSavedRemoveModal } = useContext(ShopContext)


    const [isClicked, setIsClicked] = useState(false);


    const handleClick = () => {
        const token = localStorage.getItem('token');

        if (!token) {
            localStorage.setItem('pendingSaveItem', props.id);
            window.location.replace('/login')
        } else {
            if (isClicked === false) {
                setIsClicked(true);
                saveItem(props.id);
                setSavedModal(true);
            } else {
                setIsClicked(false);
                removeSaveItem(props.id);
                setSavedRemoveModal(true);
            }
        }
    };

    const handleProductClick = () => {
        window.scrollTo(0, 0);
    };

    // Check after Login for Pending Save Item
    useEffect(() => {
        const token = localStorage.getItem('token');
        const pendingItemId = localStorage.getItem('pendingSaveItem');

        if (token && pendingItemId) {
            saveItem(pendingItemId);
            setSavedModal(true);
            localStorage.removeItem('pendingSaveItem');
        }
    }, [saveItem, setSavedModal]);

    if (props.Items_left < 50) {
        const maxItem = 50;
        const percentage = (props.Items_left / maxItem) * 100
        return (
            <div className='w-[240px] p-2 bg-white relative duration-300 flex flex-col justify-between h-full'>
                <Link
                    to={`/product/${props.id}`}
                    onClick={handleProductClick}
                >
                    <div className='bg-white hover:shadow-xl px-2 duration-300 py-[2px] flex-grow flex flex-col justify-between'>
                        <div>
                            <img src={props.Image} alt={`${props.Name}`} className='w-full' />
                        </div>
                        <p className='my-3 line-clamp-[2]'>{props.Name}</p>
                        <div className='flex gap-2 text-[18px] font-semibold'>
                            <p className='flex items-center'><TbCurrencyNaira className='text-[21px]' /> {props.New_price}</p>
                            {props.Old_price > 0 ? (
                                <p className='line-through text-[#a19f9f] flex items-center font-medium'><TbCurrencyNaira className='text-[21px]' /> {props.Old_price}</p>
                            ) : ""}
                        </div>
                        <p className=''>{props.Items_left} items left</p>
                        <div className='w-full h-[10px] bg-[#e0e0e0] rounded-md'>
                            <div className={`h-full rounded-md ${percentage > 35 ? "bg-green-500" : "bg-red-500"
                                }`}
                                style={{ width: `${percentage}%` }}></div>
                        </div>
                    </div>
                </Link >
                <IoMdHeart className={`absolute top-1 right-4 text-2xl cursor-pointer ${isClicked ? 'text-orange-400' : 'text-transparent'} hover:text-orange-400`}
                    style={{
                        stroke: isClicked ? "orange" : "red",
                        strokeWidth: 16,
                    }}
                    onClick={handleClick}
                />
            </div >
        )
    } else if (props.Items_left < 150) {
        const maxItem = 150;
        const percentage = (props.Items_left / maxItem) * 100
        return (
            <div className='w-[240px] p-2 bg-white duration-300 relative flex flex-col justify-between h-full'>
                <Link
                    to={`/product/${props.id}`}
                    onClick={handleProductClick}
                >
                    <div className='bg-white hover:shadow-xl px-2 duration-300 py-[2px] flex-grow flex flex-col justify-between'>
                        <div>
                            <img src={props.Image} alt={`${props.Name}`} className='w-full' />
                        </div>
                        <p className='my-3 line-clamp-[2]'>{props.Name}</p>
                        <div className='flex gap-2 text-[18px] font-semibold'>
                            <p className='flex items-center'><TbCurrencyNaira className='text-[21px]' /> {props.New_price}</p>
                            {props.Old_price > 0 ? (
                                <p className='line-through text-[#a19f9f] flex items-center font-medium'><TbCurrencyNaira className='text-[21px]' /> {props.Old_price}</p>
                            ) : ""}
                        </div>
                        <p className=''>{props.Items_left} items left</p>
                        <div className='w-full h-[10px] bg-[#e0e0e0] rounded-md'>
                            <div className={`h-full rounded-md ${percentage > 40 ? "bg-green-500" : "bg-red-500"
                                }`}
                                style={{ width: `${percentage}%` }}></div>
                        </div>
                    </div>
                </Link >
                <IoMdHeart className={`absolute top-1 right-4 text-2xl cursor-pointer ${isClicked ? 'text-orange-400' : 'text-transparent'} hover:text-orange-400`}
                    style={{
                        stroke: isClicked ? "orange" : "red",
                        strokeWidth: 16,
                    }}
                    onClick={handleClick}
                />
            </div >
        )
    }

}

export default HomeItems