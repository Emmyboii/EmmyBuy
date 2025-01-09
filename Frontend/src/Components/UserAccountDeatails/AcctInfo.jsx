import React, { useEffect, useState } from 'react'

const AcctInfo = () => {

    useEffect(() => {
        fetch('http://localhost:5000/user/getUsers', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'token': `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((data) => setFormData(data))
    }, [])

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    })

    return (
        <div className='rounded-lg bg-white my-9'>
            <h1 className='p-4 pb-2 text-[25px] font-bold'>Account Information</h1>
            <hr className='h-[2px] border-black' />
            <div className='p-4'>
                <label htmlFor="firstName">
                    <p className='mb-1 text-[17px]'>First Name</p>
                    <input type="text" name="firstName" value={formData.firstName} id="firstName" className='bg-[#e0e0e0] w-full pl-3 outline-none cursor-not-allowe ointer-events-none h-[45px] rounded-[4px]' disabled />
                </label>
                <label htmlFor="lastName">
                    <p className='mb-1 mt-7 text-[17px]'>Last Name</p>
                    <input type="text" name="lastName" value={formData.lastName} id="lastName" className='bg-[#e0e0e0] w-full pl-3 outline-none cursor-not-allowe ointer-events-none h-[45px] rounded-[4px]' disabled />
                </label>
                <label htmlFor="email">
                    <p className='mb-1 mt-7 text-[17px]'>Email Address</p>
                    <input type="text" name="email" value={formData.email} id="email" className='bg-[#e0e0e0] w-full pl-3 outline-none cursor-not-allowe ointer-events-none h-[45px] rounded-[4px]' disabled />
                </label>
                <label htmlFor="current_password">
                    <p className='mb-1 mt-7 text-[17px]'>Current Password</p>
                    <input type="text" name="password" id="current_password" className='bg-transparent border-black border-[1px] w-full pl-3 outline-none h-[45px] rounded-[4px]' />
                </label>
                <label htmlFor="new_password">
                    <p className='mb-1 mt-7 text-[17px]'>New Password</p>
                    <input type="text" name="new_password" id="new_password" className='bg-transparent border-black border-[1px] w-full pl-3 outline-none h-[45px] rounded-[4px]' />
                </label>
                <label htmlFor="confirm_password">
                    <p className='mb-1 mt-7 text-[17px]'>Confirm Password</p>
                    <input type="text" name="confirm_password" id="confirm_password" className='bg-transparent border-black border-[1px] w-full pl-3 outline-none h-[45px] rounded-[4px]' />
                </label>
                <button className='bg-red-500 text-white w-full text-[19px] font-semibold mt-7 h-[45px] rounded-[4px]'>Save Changes</button>
            </div>
        </div>
    )
}

export default AcctInfo