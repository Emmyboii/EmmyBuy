import React from 'react'

const NewsLetter = () => {
    return (
        <div className='w-full grid grid-cols-3 bg-black/40 py-[50px] px-[30px] mt-6'>
            <div className='col-span-2'>
                <p className='text-white text-[30px] font-bold'>New to EmmyBuy?</p>
                <p className='text-white text-[20px] font-medium'>Subscribe to our newsletter to get updates on our latest offers!</p>
            </div>
            <div className=' flex flex-col gap-1'>
                <div className='flex gap-2'>
                    <input className='h-[60px] w-full text-black pl-[6px] rounded-lg' type="text" name="" id="" placeholder='Enter your Email Address' />
                    <button className='bg-red-500 w-[150px] text-white rounded-lg'>subscribe</button>
                </div>
            </div>
        </div>
    )
}

export default NewsLetter