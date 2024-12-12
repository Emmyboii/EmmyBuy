import React, { useContext } from 'react'
import save from '../../assets/save.svg';
import { Link, useNavigate } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import { TbCurrencyNaira } from "react-icons/tb";

const SavedItems = () => {

    const { removeSaveItem, savedItem, addToCart, allProduct } = useContext(ShopContext)
    const navigate = useNavigate()

    const hasItemsInCart = allProduct.some((item) => savedItem[item.id] > 0);

    if (!hasItemsInCart) {
        return (
            <div className='rounded-lg bg-white w-[800px] h-[700px] my-9'>
                <h1 className='p-4 pb-2 text-[25px] font-bold'>Saved Items</h1>
                <hr className='h-[2px] border-black' />
                <div className='flex flex-col items-center justify-center py-[110px] px-[100px] text-center gap-6'>
                    <img src={save} alt="" />
                    <p className='font-semibold text-[21px]'>You haven't saved an item yet!</p>
                    <p>Found something you like? Tap on the heart shaped icon next to the item to add it to your wishlist!
                        All your saved items will appear here.
                    </p>
                    <Link to='/'>
                        <button className='bg-orange-500 text-white p-3 rounded-md'>Continue Shopping</button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className='rounded-lg bg-white w-[800px] min-h-[700px] pb-1 my-9'>
            <h1 className='p-4 pb-2 text-[25px] font-bold'>Saved Items</h1>
            <hr className='h-[2px] border-black' />
            {allProduct.map((item, i) => {
                if (savedItem[item.id] > 0) {
                    return <div key={i}>
                        <div className='flex items-center p-4 gap-4 rounded-sm border border-black m-3'>
                            <img src={item.Image} className='w-[10%]' alt="" />
                            <div className='flex flex-col gap-5 w-full'>
                                <p>{item.Name}</p>
                                <div className='flex justify-between'>
                                    <div>
                                        <p className='flex items-center'><TbCurrencyNaira className='text-[21px]' /> {item.New_price}</p>
                                        {item.Old_price > 0 ? (
                                            <p className='line-through text-[#a19f9f] flex items-center font-medium'><TbCurrencyNaira className='text-[21px]' /> {item.Old_price}</p>
                                        ) : ""}
                                    </div>
                                    <div className='flex items-center gap-4'>
                                        <p onClick={() => removeSaveItem(item.id)} className='hover:bg-orange-300 rounded-md p-3 cursor-pointer text-orange-500'>REMOVE</p>
                                        <button onClick={() => {
                                            addToCart(item.id)
                                            navigate('/cart')
                                        }}
                                            className='bg-orange-500 rounded-md text-white p-3 font-semibold'>
                                            BUY NOW
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                return null
            })}
        </div>
    )
}

export default SavedItems