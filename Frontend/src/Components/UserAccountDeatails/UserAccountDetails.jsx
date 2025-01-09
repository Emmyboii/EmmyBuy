import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AcctInfo from './AcctInfo'
import DeliveryAddress from './DeliveryAddress'
import SavedItems from './SavedItems'
import DeleteAcct from './DeleteAcct'

const UserAccountDetails = () => {
    return (
        <div className='w-full mq:max-w-[70%]'>
            <Routes>
                <Route path='/acct_info' element={<AcctInfo />} />
                <Route path='/address' element={<DeliveryAddress />} />
                <Route path='/saved_items' element={<SavedItems />} />
                <Route path='/delete_acct' element={<DeleteAcct />} />
            </Routes>
        </div>
    )
}

export default UserAccountDetails