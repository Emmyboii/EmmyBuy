import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AcctInfo from './AcctInfo'
import DeliveryAddress from './DeliveryAddress'
import SavedItems from './SavedItems'
import DeleteAcct from './DeleteAcct'
import Orders from './Orders'
import Wallet from './Wallet'

const UserAccountDetails = () => {

    return (
        <div className='w-full mq:max-w-[70%]'>
            <Routes>
                <Route path='/acct_info' element={<AcctInfo />} />
                <Route path='/address' element={<DeliveryAddress />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/saved_items' element={<SavedItems />} />
                <Route path='/wallet' element={<Wallet />} />
                <Route path='/delete_acct' element={<DeleteAcct />} />
            </Routes>
        </div>
    )
}

export default UserAccountDetails