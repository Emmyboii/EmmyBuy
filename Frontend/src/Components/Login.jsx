import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const login = async () => {
        let responseData
        await fetch('https://emmybuy.vercel.app/user/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((res) => res.json())
            .then((data) => responseData = data)

        if (responseData.success) {
            localStorage.setItem('token', responseData.token)
            alert(responseData.message)
            const previousPage = localStorage.getItem('previousPage') || '/'; // Default to home if no previous page

            window.location.replace(previousPage);
        } else {
            alert(responseData.error)
        }
    }

    return (
        <div className='w-full py-10'>
            <div className='w-[550px] bg-white rounded-lg m-auto'>
                <p className='text-[25px] font-semibold text-center p-3'>Log In to Continue</p>
                <hr className='border border-black' />
                <div className='w-full p-5 flex flex-col gap-4'>
                    <label htmlFor="Email_Address">
                        <p className='text-[20px]'>Email Address</p>
                        <input className='bg-gray-300 h-[50px] w-full pl-3 outline-none' onChange={handleChange} type="text" name="email" value={formData.email} id="Email_Address" placeholder='Enter your Email Address here' />
                    </label>
                    <label htmlFor="password">
                        <p className='text-[20px]'>Password</p>
                        <input className='bg-gray-300 h-[50px] w-full pl-3 outline-none' onChange={handleChange} type="password" name="password" value={formData.password} id="password" placeholder='Input Your Password' />
                    </label>
                    <button onClick={login} className='bg-red-500 text-white text-[20px] font-semibold h-[50px]'>Log In</button>
                </div>
                <div className='px-5 pb-3 flex gap-3 text-[18px]'>
                    <p>
                        Yet to have an accoount?
                    </p>
                    <Link to={'/signUp'} className='text-red-500'>Sign up now</Link>
                </div>
            </div>
        </div>
    )
}

export default Login