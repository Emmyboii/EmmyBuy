import React, { useState, useEffect, useRef } from 'react'
import { IoIosEyeOff, IoMdEye } from "react-icons/io";

const AcctInfo = () => {

    const [userPassword, setUserPassword] = useState({
        currentPassword: '',
        password1: '',
        password2: '',
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showPassword2, setShowPassword2] = useState(false)
    const [showPassword3, setShowPassword3] = useState(false)
    const [validationError, setValidationError] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [status, setStatus] = useState({ message: '', type: '' });
    const [status2, setStatus2] = useState({ message: '', type: '' });
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

    const togglePasswordVisibility3 = () => {
        setShowPassword3(!showPassword3)
    }

    const handleChange = (e) => {
        setUserPassword({
            ...userPassword,
            [e.target.name]: e.target.value
        })
        setValidationError((prev) => ({ ...prev, [e.target.name]: '' }));
        setStatus({ message: '', type: '' });
        setStatus2({ message: '', type: '' });
    }

    const validateForm = () => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*[\W_])(?=.*\d).{8,}$/;

        let error = {}

        if (!passwordRegex.test(userPassword.password1)) {
            error.password1 = 'Password must contain a minimum of 8 characters, must contain at least one digit and a special character.'
        }

        setValidationError(error)
        return Object.keys(error).length === 0;
    }

    const handleModalClose = () => {
        setShowModal(false);
        if (status.type === 'success') {
            window.location.replace('/customer/account/acct_info');
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
            let responseData
            let userData = { ...userPassword }
            await fetch('http://localhost:5000/user/changePasswordOnLogin', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'token': `${localStorage.getItem('token')}`,
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
                setStatus2({ message: responseData.error, type: 'error' })
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
            localStorage.removeItem('userEmail')
        }
    }


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

    useEffect(() => {
        // Enable button only if all fields are non-empty
        const areAllFieldsFilled = Object.values(userPassword).every((field) => field.trim() !== '');
        setIsButtonDisabled(!areAllFieldsFilled);
    }, [userPassword]);

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
                <form onSubmit={onSubmit}>
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
                    <label htmlFor="Current_password">
                        <p className='mb-1 mt-7 text-[17px]'>Current Password</p>
                        <div className='flex items-center'>
                            <input
                                className='bg-transparent border-black border-[1px] w-full pl-3 outline-none h-[45px] rounded-[4px]'
                                onChange={handleChange}
                                type={showPassword ? "text" : "password"}
                                name="currentPassword"
                                value={userPassword.currentPassword}
                                id="Current_password"
                                placeholder='Input Your Password'
                            />
                            {userPassword.currentPassword && (
                                <span onClick={togglePasswordVisibility}>
                                    {showPassword ? <IoMdEye className='ml-[-29px] text-[24px] cursor-pointer' /> : <IoIosEyeOff className='ml-[-29px] text-[24px] cursor-pointer' />}
                                </span>
                            )}
                        </div>
                        {status2.type === 'error' && <p className='text-red-500 text-[16px] flex gap-2 font-semibold'>
                            {status2.message}
                            <a onClick={() => localStorage.setItem('forgotPassword', 'Forgot Password')} className='text-red-500 underline font-semibold' href='/verifyemail'>Forgot your password?</a>
                        </p>}
                    </label>
                    <label htmlFor="New_password">
                        <p className='mb-1 mt-7 text-[17px]'>New Password</p>
                        <div className='flex items-center'>
                            <input
                                className='bg-transparent border-black border-[1px] w-full pl-3 outline-none h-[45px] rounded-[4px]'
                                onChange={handleChange}
                                type={showPassword2 ? "text" : "password"}
                                name="password1"
                                value={userPassword.password1}
                                id="New_password"
                                placeholder='Input Your New Password'
                            />
                            {userPassword.password1 && (
                                <span onClick={togglePasswordVisibility2}>
                                    {showPassword2 ? <IoMdEye className='ml-[-29px] text-[24px] cursor-pointer' /> : <IoIosEyeOff className='ml-[-29px] text-[24px] cursor-pointer' />}
                                </span>
                            )}
                        </div>
                        {validationError.password1 && <p className='text-red-500 text-[17px]'>{validationError.password1}</p>}
                    </label>
                    <label htmlFor="Confirm_password">
                        <p className='mb-1 mt-7 text-[17px]'>Confirm Password</p>
                        <div className='flex items-center'>
                            <input
                                className='bg-transparent border-black border-[1px] w-full pl-3 outline-none h-[45px] rounded-[4px]'
                                onChange={handleChange}
                                type={showPassword3 ? "text" : "password"}
                                name="password2"
                                value={userPassword.password2}
                                id="Confirm_password"
                                placeholder='Confirm Your Password'
                            />
                            {userPassword.password2 && (
                                <span onClick={togglePasswordVisibility3}>
                                    {showPassword3 ? <IoMdEye className='ml-[-29px] text-[24px] cursor-pointer' /> : <IoIosEyeOff className='ml-[-29px] text-[24px] cursor-pointer' />}
                                </span>
                            )}
                        </div>
                        {status.type === 'error' && <p className='text-red-500 text-[17px] font-semibold'>{status.message}</p>}
                    </label>
                    <button
                        className="bg-red-500 text-white w-full text-[19px] font-semibold mt-7 h-[45px] rounded-[4px] button-transition"
                        disabled={isSubmitting || isButtonDisabled}
                    >

                        {isSubmitting ? (
                            <>
                                <div className='flex items-center justify-center'>
                                    <div className='w-5 h-5 border-4 border-l-white rounded-[50%] mr-[8px] animate-spin'></div> Saving...
                                </div>
                            </>
                        ) : (
                            'Save Changes'
                        )}
                    </button>
                </form>
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
        </div >
    )
}

export default AcctInfo