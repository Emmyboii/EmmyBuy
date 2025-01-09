import React, { useContext, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext'

const DeleteAcct = () => {

    const [checked, setChecked] = useState(false)

    const { onClickDeleteAcct } = useContext(ShopContext)

    return (
        <div className='rounded-lg min-h-[700px] bg-white my-9 lg:px-[100px] mm:px-[50px] px-6 py-[140px]'>
            <h1 className='text-[25px] font-bold'>Delete Account</h1>
            <p className='text-[20px] font-semibold'>Please Read Carefully</p>
            <p>
                You are about to request that we permanently delete your data and close your EmmmyBuy account.
                All goods and services that you have access to through your account will stop being offered
                as soon as it is deleted.
            </p>

            <label className='flex items-center my-10 gap-2' htmlFor="checked">
                <input
                    type="checkbox"
                    id='checked'
                    value={checked}
                    onChange={() => setChecked(!checked)}
                />
                <p>Yes, please erase my EmmyBuy account and all of my personal data permanently.</p>
            </label>

            <button
                onClick={onClickDeleteAcct}
                className='bg-red-500 text-white w-full py-3 outline-none font-bold text-[19px] cursor-pointer button-transition'
                disabled={!checked}

            >
                DELETE MY ACCOUNT
            </button>
        </div >
    )
}

export default DeleteAcct