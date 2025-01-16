import React from 'react'

const NewsLetter = () => {
    return (
        <div className='w-full lg:grid lg:grid-cols-3 flex flex-col lg:gap-0 gap-5 bg-black/40 py-[50px] px-[30px] mt-6'>
            <div className='col-span-2'>
                <p className='text-white sm:text-[30px] text-[25px] font-bold'>New to EmmyBuy?</p>
                <p className='text-white sm:text-[20px] text-[18px] font-medium'>Subscribe to our newsletter to get updates on our latest offers!</p>
            </div>
            <div className='flex gap-2 w-full'>
                <input className='h-[60px] w-full text-black pl-[6px] rounded-lg' type="text" name="" id="" placeholder='Enter your Email Address' />
                <button className='bg-red-500 w-[100px] h-[60px] px-2 text-white font-semibold rounded-lg'>Subscribe</button>
            </div>
        </div>
    )
}

export default NewsLetter