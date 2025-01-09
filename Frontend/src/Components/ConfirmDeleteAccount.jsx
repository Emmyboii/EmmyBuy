import React, { useContext, useRef, useState } from 'react'
import { TiTimes } from "react-icons/ti";
import { ShopContext } from '../Context/ShopContext';

const ConfirmDeleteAccount = () => {

    const { onClickDeleteAcct, confirmDeleteAcct } = useContext(ShopContext)
    const DeleteModal = useRef()

    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [status, setStatus] = useState({ message: '', type: '' })

    const closeModal = (e) => {
        if (DeleteModal.current === e.target)
            onClickDeleteAcct()
    }

    const closeModals = (e) => {
        if (DeleteModal.current === e.target) {
            window.location.replace('/')
            onClickDeleteAcct()
        }
    }

    const deleteAcct = () => {
        fetch('http://localhost:5000/user/deleteUsers', {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'token': `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            body: '',
        }).then((res) => res.json())
            .then((data) => {
                setStatus({ message: data.message, type: 'success' })
            })
    }

    const handleModalClose = () => {
        setShowDeleteModal(true);
        deleteAcct()
        localStorage.removeItem('token')
        localStorage.removeItem('cartItem')
        localStorage.removeItem('loggedOutCartItem')
        localStorage.removeItem('loggedOutSavedItem')
        localStorage.removeItem('savedItem')
        localStorage.removeItem('previousPage')
    };

    if (confirmDeleteAcct === true) {
        return (
            <>
                <div ref={DeleteModal} onClick={closeModal} className='bg-black/40 fixed flex items-center justify-center z-50 inset-0 bg-opacity-30 backdrop-blur-[1.5px]'>
                    <div className='sm:w-[50%] sd:w-[80%] w-[90%] bg-white flex flex-col justify-center p-5 shadow-md shadow-black/50 relative'>
                        <h1 className='font-bold text-[20px] pb-2'>Delete Account</h1>
                        <p>Do you wish to continue?</p>
                        <div className='flex sm:gap-9 gap-4 mt-7 text-white'>
                            <button onClick={onClickDeleteAcct} className='w-full bg-red-500 py-2 rounded-md'>No</button>
                            <button onClick={handleModalClose} className='w-full bg-green-500 py-2 rounded-md'>Yes</button>
                        </div>
                        <TiTimes onClick={onClickDeleteAcct} className='absolute top-1 right-2 size-[25px] cursor-pointer' />
                    </div>
                </div>

                {showDeleteModal && (
                    <div ref={DeleteModal} onClick={closeModals} className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-[1.5px]'>
                        <div className='bg-white w-[80%] max-w-[500px] rounded-lg text-center p-5'>
                            <h1 className='text-[20px] font-bold'>Successful!</h1>
                            <p className='text-[18px]'>{status.message}</p>
                            <button className='bg-black text-white rounded-md p-2 mt-2' onClick={() => {
                                window.location.replace('/')
                                onClickDeleteAcct()
                            }}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                )}
            </>

        )
    } else {
        return null
    }
}

export default ConfirmDeleteAccount