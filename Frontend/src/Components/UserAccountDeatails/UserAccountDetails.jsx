import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AcctInfo from './AcctInfo'
import DeliveryAddress from './DeliveryAddress'
import SavedItems from './SavedItems'

const UserAccountDetails = () => {
    return (
        <div>
            <Routes>
                <Route path='/acct_info' element={<AcctInfo />} />
                <Route path='/address' element={<DeliveryAddress />} />
                <Route path='/saved_items' element={<SavedItems />} />
            </Routes>
        </div>
    )
}

export default UserAccountDetails