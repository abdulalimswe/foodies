import React, {useState} from 'react';
import Menubar from './components/Menubar/Menubar';

import { Routes, Route } from 'react-router-dom';
import ExploreFood from './pages/ExploreFood/ExploreFood.jsx';
import ContactUs from './pages/ContactUs/ContactUs.jsx';
import Home from './pages/Home/Home';


const App = () => {
    return (
      <div>
        <Menubar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/explorefood' element={<ExploreFood />} />
            <Route path='/contactus' element={<ContactUs />} />
          </Routes>
      </div>
    )
}

export default App;