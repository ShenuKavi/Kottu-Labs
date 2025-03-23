import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
              <img src={assets.logo} alt="" />
              <p>Kottulabs, We take pride in crafting delicious, high-quality meals made from the freshest ingredients. Experience great taste, convenience, and excellent service—whether dining in or ordering online.</p>
              <div className="footer-social-icons">
                  <img src={assets.facebook_icon} alt=""/>
                  <img src={assets.tiktok_icon} alt=""/>
                  <img src={assets.youtube_icon} alt=""/>
                  <img src={assets.twitter_icon} alt=""/>
                  <img src={assets.instagram_icon} alt=""/>
              </div>
            </div>
            <div className="footer-content-center">
              <h2>Restaurant</h2>
              <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>
              </ul>
                
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                  <li>Wattala - 076 130 1478  |  Kelaniya - 077 712 0815</li>
                  <li>Kelaniya - 540, Kandy Road, Dalugama, Kelaniya</li>
                  <li>Wattala -190, 3 Negombo Rd, Wattala </li>
                  <li>support@kottulabs.lk</li>
                </ul>
            </div>       
        </div>  
        <hr />
        <p className="footer-copyright">Copyright 2025 © Kottulabs.lk - All Right Reserved.</p> 
    </div>
  )
}

export default Footer