import React, { useState } from 'react'

const ProductDescription = () => {

    const [menu, setMenu] = useState('overview')

    return (
        <div className='flex gap-8 bg-white mx-7 p-5'>
            <div>
                <p onClick={()=> setMenu('overview')} className={menu==='overview'?'text-[20px] text-red-500 cursor-pointer font-semibold': 'text-[20px] cursor-pointer font-semibold'}>Overview</p>
            </div>
            <div>
                <p onClick={()=> setMenu('description')} className={menu==='description'?'text-[20px] text-red-500 cursor-pointer font-semibold': 'text-[20px] cursor-pointer font-semibold'}>Description</p>
            </div>
            <div>
                <p onClick={()=> setMenu('review')} className={menu==='review'?'text-[20px] text-red-500 cursor-pointer font-semibold': 'text-[20px] cursor-pointer font-semibold'}>Reviews</p>
            </div>
        </div>
    )
}

export default ProductDescription