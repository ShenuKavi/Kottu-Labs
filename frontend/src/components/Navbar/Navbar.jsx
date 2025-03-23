import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Home");
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false); // New state for profile dropdown

  const toggleAboutDropdown = () => {
    setAboutDropdown(prevState => !prevState);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownVisible(prevState => !prevState); // Toggle profile dropdown
  };

  const { getTotalCartAmount, token, setToken, cartItems } = useContext(StoreContext);

  const navigate = useNavigate();

  const logout = () =>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/")

  }

  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /> </Link>
      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          Menu
        </a>
        <a
          href="#promos"
          onClick={() => setMenu("promos")}
          className={menu === "promos" ? "active" : ""}
        >
          Promos
        </a>
        
        {/* About Us with Toggle Dropdown */}
        <div
          className={`about-us ${aboutDropdown ? 'active' : ''}`}
          onClick={toggleAboutDropdown} // Toggle dropdown on click
        >
          <a
            href="#aboutus"
            onClick={() => setMenu("aboutus")}
            className={menu === "aboutus" ? "active" : ""}
          >
            About us
          </a>
          {aboutDropdown && (
            <div className="dropdown-content">
              <Link to="/about-us">About Us</Link>
              <Link to="/feedback">Feedback Form</Link>
              <Link to="/faq">FAQs</Link>
              <Link to="/blog">Blog</Link>
            </div>
          )}
        </div>

        <a
          href="#footer"
          onClick={() => setMenu("contactus")}
          className={menu === "contactus" ? "active" : ""}
        >
          Contact us
        </a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <Link to='/Cart'>
            <img src={assets.basket_icon} alt=""/>
          </Link>
          <div className={getTotalCartAmount() > 0 ? "dot" : ""}></div> {/* Correct condition for dot */}
        </div>
        
        {/* Conditional rendering based on token */}
        {!token ? (
          <button onClick={() => setShowLogin(true)}>Sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img 
              src={assets.profile_icon} 
              alt="Profile" 
              onClick={toggleProfileDropdown} // Toggle dropdown on profile icon click
            />
            {/* Conditional rendering of the dropdown */}
            {isProfileDropdownVisible && (
              <ul className="nav-profile-dropdown">
                <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
                <hr />
                <li onClick={logout}><img src={assets.logout_icon} alt=""/><p>Logout</p></li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;