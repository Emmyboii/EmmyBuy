import React, { useContext, useRef } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { TiTimes } from "react-icons/ti";

const ConfirmSignOut = () => {

    const { confirmSignOut, onClickSignOut } = useContext(ShopContext)

    const signOutModal = useRef()

    const closeModal = (e) => {
        if (signOutModal.current === e.target)
            onClickSignOut()
    }

    const signOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('cartItem')
        localStorage.removeItem('loggedOutCartItem')
        localStorage.removeItem('loggedOutSavedItem')
        localStorage.removeItem('savedItem')
        localStorage.removeItem('previousPage')
        window.location.replace('/')
    }

    if (confirmSignOut === true) {
        return (
            <div ref={signOutModal} onClick={closeModal} className='bg-black/40 fixed flex items-center justify-center z-50 inset-0 bg-opacity-30 backdrop-blur-[1.5px]'>
                <div className='sm:w-[50%] sd:w-[80%] w-[90%] bg-white flex flex-col justify-center p-5 shadow-md shadow-black/50 relative'>
                    <h1 className='font-bold text-[20px] pb-2'>Sign Out</h1>
                    <p>Do you wish to continue?</p>
                    <div className='flex sm:gap-9 gap-4 mt-7 text-white'>
                        <button onClick={onClickSignOut} className='w-full bg-red-500 py-2 rounded-md'>No</button>
                        <button onClick={signOut} className='w-full bg-green-500 py-2 rounded-md'>Yes</button>
                    </div>
                    <TiTimes onClick={onClickSignOut} className='absolute top-1 right-2 size-[25px] cursor-pointer' />
                </div>
            </div>
        )
    } else {
        return null
    }

}

export default ConfirmSignOut