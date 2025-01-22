import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Cross_Icon from '../assets/cross_icon.png'
import { FaRegEdit } from "react-icons/fa";
import { TiTimes } from "react-icons/ti";


const ProductList = () => {

    const [product, setProduct] = useState([])
    const [confirmRemove, setConfirmRemove] = useState(false)

    const onClick = () => {
        setConfirmRemove(!confirmRemove)
    }

    const signOutModal = useRef()

    const closeModal = (e) => {
        if (signOutModal.current === e.target)
            onClick()
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/product/allproduct`)
            .then((res) => res.json())
            .then((data) => { setProduct(data) })
    }, [])

    const remove_product = async (id) => {
        await fetch(`${import.meta.env.VITE_API_URL}/product/deleteProduct`, {
            method: 'DELETE',
            credentials: "include",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
        window.location.replace('/productlist')
    }

    const onClickEdit = (id) => {
        localStorage.setItem('ProductID', id)
    }

    return (
        <>
            <div className="flex flex-col bg-white m-4 py-5 text-center md:w-full">
                <h1 className="text-[25px] font-bold">All Product List</h1>
                <div className="sm:grid hidden lg:grid-cols-12 grid-cols-10 border-x-2 border-y-2 border-black">
                    <p className="col-span-1 border-r-2 border-black py-3 flex justify-center items-center">Id</p>
                    <div className='lg:col-span-2 col-span-1 border-r-2 border-black py-3 flex justify-center items-center'>
                        <p className="ls:rotate-0 -rotate-45">Products</p>
                    </div>
                    <p className="lg:col-span-4 col-span-3 border-r-2 border-black py-3 flex justify-center items-center">Title</p>
                    <p className="col-span-1 border-r-2 border-black py-3 flex justify-center items-center">Old Price</p>
                    <p className="col-span-1 border-r-2 border-black py-3 flex justify-center items-center">New Price</p>
                    <p className="col-span-1 border-r-2 border-black py-3 flex justify-center items-center">Item Left</p>
                    <p className="col-span-1 border-r-2 border-black py-3 flex justify-center items-center">Edit</p>
                    <div className="col-span-1 py-3 flex justify-center items-center">
                        <p className='ls:rotate-0 -rotate-45'>Remove</p>
                    </div>
                </div>
                <div>
                    {product.map((item, i) => {
                        return (
                            <div key={i} className='border-x-2 border-y-2 border-black'>
                                <div className="grid lg:grid-cols-12 grid-cols-10" >
                                    <p className='col-span-1 border-r-2 border-black flex justify-center items-center'>{item.id}</p>
                                    <div className="lg:col-span-2 col-span-1 border-r-2 border-black flex justify-center items-center">
                                        <Link
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            to={`${localStorage.getItem('Image_URL')}`}
                                        >
                                            <img src={item.Image} alt="" className="lg:w-[50%] object-contain" />
                                        </Link>
                                    </div>
                                    <p className='lg:col-span-4 col-span-3 border-r-2 border-black flex justify-center items-center text-[15px]'>{item.Name}</p>
                                    {item.Old_price ? <p className='col-span-1 border-r-2 border-black flex justify-center items-center'>{item.Old_price}</p> : <p className='border-r-2 border-black flex justify-center items-center'>-</p>}
                                    <p className='col-span-1 border-r-2 border-black flex justify-center items-center'>{item.New_price}</p>
                                    <p className='col-span-1 border-r-2 border-black flex justify-center items-center'>{item.Items_left}</p>
                                    <Link
                                        onClick={() => onClickEdit(item.id)}
                                        className="col-span-1 border-r-2 border-black flex justify-center items-center cursor-pointer"
                                        to="/editproduct"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <p className="flex mp:flex-row flex-col items-center gap-1">
                                            <FaRegEdit /> Edit
                                        </p>
                                    </Link>
                                    <p onClick={onClick} className='col-span-1 flex justify-center items-center cursor-pointer'><img src={Cross_Icon} alt="" /></p>
                                </div>

                                {confirmRemove ?
                                    <div ref={signOutModal} onClick={closeModal} className='bg-black/40 fixed flex items-center justify-center z-50 inset-0 bg-opacity-30 backdrop-blur-[1.5px]'>
                                        <div className='sm:w-[50%] sd:w-[80%] w-[90%] bg-white flex flex-col justify-center p-5 shadow-md shadow-black/50 relative'>
                                            <h1 className='font-bold text-[20px] pb-2'>Delete Product</h1>
                                            <p>Do you wish to continue?</p>
                                            <div className='flex sm:gap-9 gap-4 mt-7 text-white'>
                                                <button onClick={onClick} className='w-full bg-red-500 py-2 rounded-md'>No</button>
                                                <button onClick={() => remove_product(item.id)} className='w-full bg-green-500 py-2 rounded-md'>Yes</button>
                                            </div>
                                            <TiTimes onClick={onClick} className='absolute top-1 right-2 size-[25px] cursor-pointer' />
                                        </div>
                                    </div>
                                    :
                                    ''
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        </>

    )
}

export default ProductList