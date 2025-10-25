import React from 'react'

import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Cars from './pages/Cars';
import MyBookings from './pages/MyBookings';
import Footer from './components/Footer';
import Layout from './pages/Owner/Layout';
import Dashboard from './pages/Owner/Dashboard';
import AddCar from './pages/Owner/AddCar';
import ManageCars from './pages/Owner/ManageCars';
import ManageBookings from './pages/Owner/ManageBookings';
import LoginPage from './pages/LoginPage';

import {Toaster} from "react-hot-toast";
import { useAppContext } from './context/AppContext';
import Navbar from './components/Navbar';

const App = () => {
  
 
  const isOwnerPath = useLocation().pathname.startsWith('/owner');

  const {showLogin}=useAppContext();
  return (
    < >
    <Toaster/>
      {showLogin && <LoginPage  />}
    
      {!isOwnerPath && <Navbar  />}

      <Routes>
        <Route path='/' element={<Home/>} />

        <Route path='/car-details/:id' element={<CarDetails/>} />
        <Route path='/cars' element={<Cars/>} />
        <Route path='/my-bookings' element={<MyBookings/>}/>
        <Route path='/owner' element={<Layout/>} >
        
        <Route index element={<Dashboard/>} />
        <Route  path='add-car' element={<AddCar/>} />
        <Route path='manage-cars' element={<ManageCars/>} />
        <Route path='manage-bookings' element={<ManageBookings/>} />
        </Route>
      </Routes>
      {!isOwnerPath && <Footer/>}
    </>
  )
}

export default App
