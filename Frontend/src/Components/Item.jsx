import React, { useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { Link } from 'react-router-dom'
import { IoMdHeart } from "react-icons/io";
import { TbCurrencyNaira } from "react-icons/tb";

const Item = (props) => {

    const { addToCart, saveItem, removeSaveItem } = useContext(ShopContext)

    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (isClicked === false) {
            setIsClicked(!isClicked);
            saveItem(props.id)
        } else if (isClicked === true) {
            setIsClicked(!isClicked);
            removeSaveItem(props.id)
        }
    };
    const handleProductClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className='w-[230px] bg-white hover:scale-[1.02] p-2 duration-300 relative'>
            <Link to={`/product/${props.id}`} onClick={handleProductClick}>
                <div>
                    <img src={props.Image} alt={`${props.Name}`} className='w-full' />
                    <p className='my-3 line-clamp-[2]'>{props.Name}</p>
                    <div className='flex gap-3 text-[18px] font-semibold'>
                        <p className='flex items-center'><TbCurrencyNaira className='text-[21px]' /> {props.New_price}</p>
                        {props.Old_price > 0 ? (
                            <p className='line-through text-[#a19f9f] flex items-center font-medium'><TbCurrencyNaira className='text-[21px]' /> {props.Old_price}</p>
                        ) : ""}
                    </div>
                </div>
            </Link>
            <button onClick={() => addToCart(props.id)} className='bg-orange-500 h-[50px] w-full text-white font-bold mt-3'>ADD TO CART</button>
            <IoMdHeart className={`absolute top-1 right-[2px] text-2xl cursor-pointer ${isClicked ? 'text-orange-400' : 'text-transparent'} hover:text-orange-400`}
                style={{
                    stroke: isClicked ? "orange" : "red",
                    strokeWidth: 16,
                }}
                onClick={handleClick}
            />
        </div >
    )
}

export default Item