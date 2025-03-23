import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Header.css";

const images = ["header_img.png","/img2.png", "/img3.jpg"]; // Image paths

const Header = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt="Header"
          className="header-image"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>
      <div className="header-contents">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Savor the Best Kottu in Town!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Authentic Sri Lankan Kottu, bursting with flavors! <br />
          Made fresh with the finest ingredients <br></br>for the ultimate food experience.
        </motion.p>
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          Order Now
        </motion.button>
      </div>
    </div>
  );
};

export default Header;
