import React, {useState} from 'react';
import Menubar from './components/Menubar/Menubar';

import { Routes, Route } from 'react-router-dom';
import ExploreFood from './pages/ExploreFood/ExploreFood.jsx';
import ContactUs from './pages/ContactUs/ContactUs.jsx';
import Home from './pages/Home/Home';
import FoodDetails from './pages/FoodDetails/FoodDetails.jsx';
import Cart from "./pages/Cart/Cart.jsx";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder.jsx";
import Login from "./components/Login/Login.jsx";
import Register from "./components/Register/Register.jsx";


const App = () => {
    return (
      <div>
        <Menubar />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/explorefood' element={<ExploreFood />} />
              <Route path='/contactus' element={<ContactUs />} />
              <Route path='/food/:id' element={<FoodDetails />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/order' element={<PlaceOrder />} />
              <Route path='/login' element={<Login/>}/>
              <Route path='/register' element={<Register/>}/>
          </Routes>
      </div>
    )
}

export default App;