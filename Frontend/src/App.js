import React from 'react';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import ShopCategory from './Pages/ShopCategory';
import phone_banner from './assets/Phones Accessories/Phone.jpg'
import fahion_banner from './assets/Fashion/Fashion.jpg'
import drink_banner from './assets/Drinks & Groceries/Drinks.jpg'
import game_banner from './assets/Gaming/Gaming.jpg'
import kitchen_banner from './assets/Appliances/Kitchen.jpg'
import Footer from './Components/Footer';
import ProductDisplay from './Pages/ProductDisplay';
import Cart from './Pages/Cart';
import UserAccount from './Pages/UserAccount';
import SignUp from './Components/SignUp';
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/phone&accessories' element={<ShopCategory banner={phone_banner} name='Phone & Accessories' Category="Phone & Accessories" />} />
          <Route path='/fashion' element={<ShopCategory banner={fahion_banner} name='Fashion' Category="Fashion" />} />
          <Route path='/drinks&groceries' element={<ShopCategory banner={drink_banner} name='Drinks & Groceries' Category="Drinks & Groceries" />} />
          <Route path='/gaming' element={<ShopCategory banner={game_banner} name='Gaming' Category="Gaming" />} />
          <Route path='/kitchen' element={<ShopCategory banner={kitchen_banner} name='Appliances' Category="Appliances" />} />

          <Route path="/product/:productID" element={<ProductDisplay />} />

          <Route path='/cart' element={<Cart />} />

          <Route path='/account' element={<UserAccount />} >
            <Route path='acct_info' element={<UserAccount />} />
            <Route path='address' element={<UserAccount />} />
            <Route path='saved_items' element={<UserAccount />} />
          </Route>

          <Route path='/signUp' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
