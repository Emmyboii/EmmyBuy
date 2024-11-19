import AddProduct from "../src/components/AddProduct"
import { Routes, Route } from 'react-router-dom'

const Admin = () => {
    return (
        <div>
            <Routes>
                <Route path="/addproduct" element={<AddProduct />} />
            </Routes>
        </div>
    )
}

export default Admin