import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Menu from './components/ExploreMenu/ExploreMenu';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';


// Import the new pages
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AboutUs from './pages/AboutUs/AboutUs';
import FAQ from './pages/FAQ/FAQ';
import FeedbackForm from './pages/FeedbackForm/FeedbackForm';
import Blog from './pages/Blog/Blog';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <AnimatePresence>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<PlaceOrder />} />
            <Route path='/explore-menu' element={<Menu />} />
            
            {/* ✅ Add the Forgot Password & Reset Password routes */}
            <Route path='/forgot-password' element={<ForgotPassword />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />

            {/* ✅ New About Us Dropdown Routes */}
            <Route path='/about-us' element={<AboutUs />} />
            <Route path='/faq' element={<FAQ />} />
            <Route path='/feedback' element={<FeedbackForm />} />
            <Route path='/blog' element={<Blog />} />

          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </>
  );
};

export default App;

