import AddProduct from "./components/AddProduct"
import EditProduct from "./components/EditProduct"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import ProductList from "./components/ProductList"
import Sidebar from "./components/Sidebar"
import { Routes, Route } from 'react-router-dom'


function App() {

  return (
    <div>
      <Navbar />
      <div className="md:flex">
        <Sidebar />
        <Routes>
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/productlist" element={<ProductList />} />
          <Route path="/editproduct" element={<EditProduct />} />
        </Routes>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
