import React, { useState, useRef } from 'react'
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

const ForgotPassword = () => {

    const [formData, setFormData] = useState({
        password1: '',
        password2: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
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

    const togglePasswordVisibility2 = () => {
        setShowPassword2(!showPassword2)
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setValidationError((prev) => ({ ...prev, [e.target.name]: '' }));
    }

    const validateForm = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*[\W_])(?=.*\d).{8,}$/;

        let error = {}

        if (!passwordRegex.test(formData.password1)) {
            error.password1 = 'Password must contain a minimum of 8 characters, must contain at least one digit and a special character.'
        }

        setValidationError(error)
        return Object.keys(error).length === 0;
    }

    const handleModalClose = () => {
        setShowModal(false);
        if (status.type === 'success' && localStorage.getItem('token')) {
            window.location.replace('/');
        } else if (status.type === 'success') {
            window.location.replace('/login');
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            console.log("Validation failed!");
            return;
        }

        setIsSubmitting(true);
        try {
            const email = localStorage.getItem('userEmail')
            let responseData
            let userData = { ...formData, email }
            await fetch('http://localhost:5000/user/changePassword', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            }).then((res) => res.json())
                .then((data) => responseData = data)

            if (responseData.success) {
                setStatus({ message: responseData.message, type: 'success' })
                setShowModal(true)
            } else {
                setStatus({ message: responseData.message, type: 'error' })
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
            localStorage.removeItem('userEmail')
        }
    }

    return (
        <div className='w-full py-10'>
            <form onSubmit={onSubmit}>
                <div className='m-auto sk:max-w-[550px] bg-white rounded-lg'>
                    <p className='text-[25px] font-semibold text-center p-3'>Change Your Password</p>
                    <hr className='border border-black' />
                    <div className='w-full p-5 flex flex-col gap-4'>
                        <label htmlFor="New_password">
                            <p className='text-[20px]'>New Password</p>
                            <div className='flex items-center'>
                                <input
                                    className='bg-gray-300 h-[50px] w-full pl-3 outline-none'
                                    onChange={handleChange}
                                    type={showPassword ? "text" : "password"}
                                    name="password1"
                                    value={formData.password1}
                                    id="New_password"
                                    placeholder='Input Your New Password'
                                />
                                {showPassword ? <IoMdEye onClick={togglePasswordVisibility} className='ml-[-29px] text-[24px] cursor-pointer' /> : <IoIosEyeOff onClick={togglePasswordVisibility} className='ml-[-29px] text-[24px] cursor-pointer' />}
                            </div>
                            {validationError.password1 && <p className='text-red-500 text-[17px]'>{validationError.password1}</p>}
                        </label>
                        <label htmlFor="Confirm_password">
                            <p className='text-[20px]'>Confirm Password</p>
                            <div className='flex items-center'>
                                <input
                                    className='bg-gray-300 h-[50px] w-full pl-3 outline-none'
                                    onChange={handleChange}
                                    type={showPassword2 ? "text" : "password"}
                                    name="password2"
                                    value={formData.password2}
                                    id="Confirm_password"
                                    placeholder='Confirm Your Password'
                                />
                                {showPassword2 ? <IoMdEye onClick={togglePasswordVisibility2} className='ml-[-29px] text-[24px] cursor-pointer' /> : <IoIosEyeOff onClick={togglePasswordVisibility2} className='ml-[-29px] text-[24px] cursor-pointer' />}
                            </div>
                            {status.type === 'error' && <p className='text-red-500 text-[17px] font-semibold'>{status.message}</p>}
                        </label>
                        <button
                            className="bg-red-500 text-white text-[20px] font-semibold h-[50px] button-transition"
                            disabled={isSubmitting}
                        >

                            {isSubmitting ? (
                                <>
                                    <div className='flex items-center justify-center'>
                                        <div className='w-5 h-5 border-4 border-l-white rounded-[50%] mr-[8px] animate-spin'></div> Loading...
                                    </div>
                                </>
                            ) : (
                                'Change'
                            )}
                        </button>
                    </div>
                    {showModal && (
                        <div ref={openModal} onClick={modal} className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-[1.5px]'>
                            <div className='bg-white w-[80%] max-w-[500px] rounded-lg text-center p-5'>
                                <h1 className='text-[20px] font-bold'>SUCCESS</h1>
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

export default ForgotPassword