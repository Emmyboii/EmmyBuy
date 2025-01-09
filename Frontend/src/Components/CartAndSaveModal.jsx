import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { FaCircleXmark } from "react-icons/fa6";
import { IoCheckmarkSharp } from "react-icons/io5";

const CartAndSaveModal = () => {



    const {
        ModalOn,
        SavedModalOn,
        cartModal,
        savedModal,
        ModalClose,
        SavedModalClose,
        cartRemoveModal,
        savedRemoveModal,
        quantityModal,
        QuantityModalOn, setCartModal,
        setSavedModal,
        setCartRemoveModal,
        setSavedRemoveModal,
        setQuantityModal,
    } = useContext(ShopContext)

    useEffect(() => {
        if (cartModal) {
            const timer = setTimeout(() => {
                setCartModal(false)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [cartModal, setCartModal]);

    useEffect(() => {
        if (savedModal) {
            const timer = setTimeout(() => {
                setSavedModal(false)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [savedModal, setSavedModal]);

    useEffect(() => {
        if (cartRemoveModal) {
            const timer = setTimeout(() => {
                setCartRemoveModal(false)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [cartRemoveModal, setCartRemoveModal]);

    useEffect(() => {
        if (savedRemoveModal) {
            const timer = setTimeout(() => {
                setSavedRemoveModal(false)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [savedRemoveModal, setSavedRemoveModal]);

    useEffect(() => {
        if (quantityModal) {
            const timer = setTimeout(() => {
                setQuantityModal(false)
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [quantityModal, setQuantityModal]);



    if (cartModal === true) {
        return (
            <div className='fixed top-0 w-full bg-green-500 flex items-center justify-center z-50 text-white py-2 text-[19px] duration-500'>
                <p className='flex gap-1 items-center'>
                    <IoCheckmarkSharp className='text-[20px]' />
                    Product Added Successfully
                </p>
                <FaCircleXmark onClick={ModalOn} className='text-[21px] cursor-pointer absolute right-5' />
            </div>
        )
    }

    if (quantityModal === true) {
        return (
            <div className='fixed top-0 w-full bg-green-500 flex items-center justify-center z-50 text-white py-2 text-[19px] duration-500'>
                <p className='flex gap-1 items-center'>
                    <IoCheckmarkSharp className='text-[20px]' />
                    Item quantity has been updated
                </p>
                <FaCircleXmark onClick={QuantityModalOn} className='text-[21px] cursor-pointer absolute right-5' />
            </div>
        )
    }

    if (savedModal === true) {
        return (
            <div className='fixed top-0 w-full bg-green-500 flex items-center justify-center z-50 text-white py-2 text-[19px] duration-500'>
                <p className='flex gap-1 items-center'>
                    <IoCheckmarkSharp className='text-[20px]' />
                    Product Successfully Added to your Wishlist
                </p>
                <FaCircleXmark onClick={SavedModalOn} className='text-[21px] cursor-pointer absolute right-5' />
            </div>
        )
    }

    if (cartRemoveModal === true) {
        return (
            <div className='fixed top-0 w-full bg-green-500 flex items-center justify-center z-50 text-white py-2 text-[19px] duration-500'>
                <p className='flex gap-1 items-center'>
                    <IoCheckmarkSharp className='text-[20px]' />
                    Product was Removed from Cart
                </p>
                <FaCircleXmark onClick={ModalClose} className='text-[21px] cursor-pointer absolute right-5' />
            </div>
        )
    }

    if (savedRemoveModal === true) {
        return (
            <div className='fixed top-0 w-full bg-green-500 flex items-center justify-center z-50 text-white py-2 text-[19px] duration-500'>
                <p className='flex gap-1 items-center'>
                    <IoCheckmarkSharp className='text-[20px]' />
                    The Item was Removed Successfully
                </p>
                <FaCircleXmark onClick={SavedModalClose} className='text-[21px] cursor-pointer absolute right-5' />
            </div>
        )
    }

}

export default CartAndSaveModal