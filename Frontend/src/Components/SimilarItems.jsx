import React from 'react'
import { Link } from 'react-router-dom'
import { TbCurrencyNaira } from "react-icons/tb";

const SimilarItems = (props) => {


    const handleProductClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div>
            <div className='w-[238px] p-2 bg-white'>
                <Link to={`/product/${props.id}`}>
                    <div onClick={handleProductClick} className='bg-white hover:shadow-xl px-2 duration-300 relative py-[2px]'>
                        <div className='relative'>
                            <img src={props.Image} alt={`${props.Name}`} className='w-full' />
                        </div>
                        <p className='my-3 line-clamp-[2]'>{props.Name}</p>
                        <div className='flex gap-3 text-[18px] font-semibold'>
                            <p className='flex items-center'><TbCurrencyNaira className='text-[21px]' /> {props.New_price}</p>
                            {props.Old_price > 0 ? (
                                <p className='line-through text-[#a19f9f] flex items-center font-medium'><TbCurrencyNaira className='text-[21px]' /> {props.Old_price}</p>
                            ) : ""}
                        </div>
                    </div>
                </Link >
            </div >
        </div>
    )
}

export default SimilarItems