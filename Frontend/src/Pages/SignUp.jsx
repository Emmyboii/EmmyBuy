import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

const SignUp = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
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
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*[\W_])(?=.*\d).{8,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^(?!\s+$).+/;

        let error = {}

        if (!nameRegex.test(formData.firstName)) {
            error.firstName = 'Please Input a Correct Frist Name.'
        }

        if (!nameRegex.test(formData.lastName)) {
            error.lastName = 'Please Input a Correct Last Name.'
        }

        if (!emailRegex.test(formData.email)) {
            error.email = 'Please Enter a Valid Email address.'
        }

        if (!passwordRegex.test(formData.password)) {
            error.password = 'Password must contain a minimum of 8 characters, must contain at least one digit and a special character.'
        }

        setValidationError(error)
        return Object.keys(error).length === 0;
    }

    const OnSignUp = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            console.log("Validation failed!");
            return;
        }

        setIsSubmitting(true);

        try {
            let responseData
            await fetch('http://localhost:5000/user/signUp', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then((res) => res.json())
                .then((data) => responseData = data)

            if (responseData.success) {
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
    };

    const handleModalClose = () => {
        setShowModal(false);
        if (status.type === 'success') {
            window.location.replace('/login')
        }
    };

    return (
        <div className='w-full py-10'>
            <form onSubmit={OnSignUp}>
                <div className='sk:max-w-[550px] bg-white rounded-lg m-auto'>
                    <p className='text-[25px] font-semibold text-center p-3'>Sign Up Now</p>
                    <hr className='border border-black' />
                    <div className='w-full p-5 flex flex-col gap-4'>
                        <label htmlFor="firstName">
                            <p className='text-[20px]'>First Name</p>
                            <input className={validationError.firstName ? 'bg-gray-300 h-[50px] w-full pl-3 outline-none border-2 border-red-500' : 'bg-gray-300 h-[50px] w-full pl-3 outline-none'} onChange={handleChange} type="text" name="firstName" value={formData.firstName} id="firstName" placeholder='Enter your First Name here' />
                            {validationError.firstName && <p className='text-red-500 text-[17px]'>{validationError.firstName}</p>}
                        </label>
                        <label htmlFor="lastName">
                            <p className='text-[20px]'>Last Name</p>
                            <input className={validationError.lastName ? 'bg-gray-300 h-[50px] w-full pl-3 outline-none border-2 border-red-500' : 'bg-gray-300 h-[50px] w-full pl-3 outline-none'} onChange={handleChange} type="text" name="lastName" value={formData.lastName} id="lastName" placeholder='Enter your Last Name here' />
                            {validationError.lastName && <p className='text-red-500 text-[17px]'>{validationError.lastName}</p>}
                        </label>
                        <label htmlFor="Email_Address">
                            <p className='text-[20px]'>Email Address</p>
                            <input className={validationError.email ? 'bg-gray-300 h-[50px] w-full pl-3 outline-none border-2 border-red-500' : 'bg-gray-300 h-[50px] w-full pl-3 outline-none'} onChange={handleChange} type="email" name="email" value={formData.email} id="Email_Address" placeholder='Enter your Email Address here' />
                            {validationError.email && <p className='text-red-500 text-[17px]'>{validationError.email}</p>}
                        </label>
                        <label htmlFor="password">
                            <p className='text-[20px]'>Password</p>
                            <div>
                                <div className='flex items-center'>
                                    <input
                                        className={validationError.password ? 'bg-gray-300 h-[50px] w-full pl-3 outline-none border-2 border-red-500' : 'bg-gray-300 h-[50px] w-full pl-3 outline-none'}
                                        onChange={handleChange}
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        id="password"
                                        placeholder='Input Your Password'
                                    />
                                    {showPassword ? <IoMdEye onClick={togglePasswordVisibility} className='ml-[-29px] text-[24px] cursor-pointer' /> : <IoIosEyeOff onClick={togglePasswordVisibility} className='ml-[-29px] text-[24px] cursor-pointer' />}
                                </div>
                                {validationError.password && <p className='text-red-500 text-[17px]'>{validationError.password}</p>}
                            </div>

                        </label>
                        <button
                            className="bg-red-500 text-white text-[20px] font-semibold h-[50px] button-transition"
                            disabled={isSubmitting}
                        >

                            {isSubmitting ? (
                                <>
                                    <div className='flex items-center justify-center'>
                                        <div className='w-5 h-5 border-4 border-l-white rounded-[50%] mr-[8px] animate-spin'></div> Signing Up...
                                    </div>
                                </>
                            ) : (
                                'Sign Up'
                            )}
                        </button>
                    </div>
                    <div className='px-5 pb-3 flex gap-3 text-[18px]'>
                        <p>
                            Already have an accoount?
                        </p>
                        <Link to={'/login'} className='text-red-500'>Login here</Link>
                    </div>
                    {showModal && (
                        <div ref={openModal} onClick={modal} className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-[1.5px]'>
                            <div className=' bg-white w-[80%] max-w-[500px] rounded-lg text-center p-5'>
                                <h1 className='text-[20px] font-bold'>{status.type === 'success' ? "SUCCESS!" : "ERROR!"}</h1>
                                <p className='text-[18px]'>{status.message}</p>
                                <button className='bg-black text-white rounded-md p-2 mt-2' onClick={handleModalClose}>OK</button>
                            </div>
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default SignUp