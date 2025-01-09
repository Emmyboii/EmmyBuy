import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { IoIosEyeOff, IoMdEye, IoMdWarning } from "react-icons/io";

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [showPassword, setShowPassword] = useState(false)
    const [validationError, setValidationError] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState({ message: '', type: '' });
    const [showModal, setShowModal] = useState(false);

    const openModal = useRef()

    const modal = (e) => {
        if (openModal.current === e.target) {
            setShowModal(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setValidationError((prev) => ({ ...prev, [e.target.name]: '' }));
    }

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let error = {}

        if (!emailRegex.test(formData.email)) {
            error.email = 'Please Enter a Valid Email address.'
        }

        setValidationError(error)
        return Object.keys(error).length === 0;
    }

    const OnLogin = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            console.log("Validation failed!");
            return;
        }

        setIsSubmitting(true);

        try {
            let responseData
            await fetch('http://localhost:5000/user/login', {
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
                setStatus({ message: responseData.message, type: 'success' })
                setShowModal(true)
            } else {
                setStatus({ message: responseData.error, type: 'error' })
                setShowModal(true)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleModalClose = () => {
        setShowModal(false);
        if (status.type === 'success') {
            const previousPage = localStorage.getItem('previousPage') || '/'; // Default to home if no previous page
            window.location.replace(previousPage);
        }
    };

    return (
        <div className='w-full py-10'>
            <form onSubmit={OnLogin}>
                <div className='max-w-[550px] bg-white rounded-lg m-auto'>
                    <p className='text-[25px] font-semibold text-center p-3'>Log In to Continue</p>
                    <hr className='border border-black' />
                    <div className='w-full p-5 flex flex-col gap-4'>
                        {showModal && (
                            <div className={status.type === 'error' ? 'bg-green-500 text-white p-2 rounded-md flex items-center justify-between' : 'bg-red-500 text-white p-2 rounded-md flex items-center justify-between'}>
                                <p className='text-[17px] font-bold'>{status.message}</p>
                                <IoMdWarning className='text-[25px]' />
                            </div>
                        )}
                        <label htmlFor="Email_Address">
                            <p className='text-[20px]'>Email Address</p>
                            <input className='bg-gray-300 h-[50px] w-full pl-3 outline-none' onChange={handleChange} type="email" name="email" value={formData.email} id="Email_Address" placeholder='Enter your Email Address here' />
                            {validationError.email && <p className='text-red-500 text-[17px]'>{validationError.email}</p>}
                        </label>
                        <label htmlFor="password">
                            <p className='text-[20px]'>Password</p>
                            <div className='flex items-center'>
                                <input
                                    className='bg-gray-300 h-[50px] w-full pl-3 outline-none'
                                    onChange={handleChange}
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    id="password"
                                    placeholder='Input Your Password'
                                />
                                {showPassword ? <IoMdEye onClick={togglePasswordVisibility} className='ml-[-29px] text-[24px] cursor-pointer' /> : <IoIosEyeOff onClick={togglePasswordVisibility} className='ml-[-29px] text-[24px] cursor-pointer' />}
                            </div>
                            {status.type === 'error' && <a className='text-red-500 underline font-semibold flex items-center justify-center' href='/forgotPassword'>Forgot your password?</a>}
                        </label>
                        <button
                            className="bg-red-500 text-white text-[20px] font-semibold h-[50px] button-transition"
                            disabled={isSubmitting}
                        >

                            {isSubmitting ? (
                                <>
                                    <div className='flex items-center justify-center'>
                                        <div className='w-5 h-5 border-4 border-l-white rounded-[50%] mr-[8px] animate-spin'></div> Logging In...
                                    </div>
                                </>
                            ) : (
                                'Log In'
                            )}
                        </button>
                    </div>
                    <div className='px-5 pb-3 flex gap-3 text-[18px]'>
                        <p>
                            Yet to have an accoount?
                        </p>
                        <Link to={'/signUp'} className='text-red-500'>Sign up now</Link>
                    </div>
                    {status.type === 'success' ? (
                        <div ref={openModal} onClick={modal} className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-[1.5px]'>
                            <div className='bg-white w-[80%] max-w-[500px] rounded-lg text-center p-5'>
                                <h1 className='text-[20px] font-bold'>SUCCESS</h1>
                                <p className='text-[18px]'>{status.message}</p>
                                <button className='bg-black text-white rounded-md p-2 mt-2' onClick={handleModalClose}>OK</button>
                            </div>
                        </div>
                    ) : ""}
                </div>
            </form>
        </div>
    )
}

export default Login