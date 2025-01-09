import React, { useState } from 'react'

const ProductDescription = () => {

    const [menu, setMenu] = useState('overview')

    return (
        <div className='flex sm:gap-8 gap-4 bg-white mx-4 p-4'>
            <div>
                <p onClick={()=> setMenu('overview')} className={menu==='overview'?'mm:text-[20px] text-[18.5px] text-red-500 cursor-pointer font-semibold': 'text-[20px] cursor-pointer font-semibold'}>Overview</p>
            </div>
            <div>
                <p onClick={()=> setMenu('description')} className={menu==='description'?'mm:text-[20px] text-[18.5px] text-red-500 cursor-pointer font-semibold': 'text-[20px] cursor-pointer font-semibold'}>Description</p>
            </div>
            <div>
                <p onClick={()=> setMenu('review')} className={menu==='review'?'mm:text-[20px] text-[18.5px] text-red-500 cursor-pointer font-semibold': 'text-[20px] cursor-pointer font-semibold'}>Reviews</p>
            </div>
        </div>
    )
}

export default ProductDescription