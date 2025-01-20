import React, { useState, useRef } from 'react'
import { IoMdWarning } from "react-icons/io";

const VerifyEmail = () => {

    const [formData, setFormData] = useState({
        email: '',
    })

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

    const handleModalClose = () => {
        setShowModal(false);
        if (status.type === 'success') {
            window.location.replace('/forgotpassword');
        }
    };

    const onVerify = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            console.log("Validation failed!");
            return;
        }

        setIsSubmitting(true);
        try {
            let responseData
            await fetch(`${process.env.REACT_APP_API_URL}/user/verifyUserEmail`, {
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
                localStorage.setItem('userEmail', formData.email)
                localStorage.setItem('emailVerified', 'Email is Verified')
            } else {
                setStatus({ message: responseData.message, type: 'error' })
                setShowModal(true)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className='w-full py-10'>
            <form onSubmit={onVerify}>
                <div className='m-auto sk:max-w-[550px] bg-white rounded-lg'>
                    <p className='text-[25px] font-semibold text-center p-3'>Verify Your Email to continue</p>
                    <hr className='border border-black' />
                    <div className='w-full p-5 flex flex-col gap-4'>
                        {showModal && (
                            <div className={status.type === 'error' ? 'bg-red-500 text-white p-2 rounded-md flex items-center justify-between' : 'bg-green-500 text-white p-2 rounded-md flex items-center justify-between'}>
                                <p className='text-[17px] font-bold'>{status.message}</p>
                                <IoMdWarning className='text-[25px]' />
                            </div>
                        )}
                        <label htmlFor="Email_Address">
                            <p className='text-[20px]'>Email Address</p>
                            <input className='bg-gray-300 h-[50px] w-full pl-3 outline-none' onChange={handleChange} type="email" name="email" value={formData.email} id="Email_Address" placeholder='Enter your Email Address here' />
                            {validationError.email && <p className='text-red-500 text-[17px]'>{validationError.email}</p>}
                        </label>
                        <button
                            className="bg-red-500 text-white text-[20px] font-semibold h-[50px] button-transition"
                            disabled={isSubmitting}
                        >

                            {isSubmitting ? (
                                <>
                                    <div className='flex items-center justify-center'>
                                        <div className='w-5 h-5 border-4 border-l-white rounded-[50%] mr-[8px] animate-spin'></div> Verifying...
                                    </div>
                                </>
                            ) : (
                                'Verify'
                            )}
                        </button>
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

export default VerifyEmail