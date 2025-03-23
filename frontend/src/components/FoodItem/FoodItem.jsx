import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, image, description, sizes, price }) => {
  
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  const [selectedSize, setSelectedSize] = useState(sizes?.[0]?.size || "Regular");
  const [selectedPrice, setSelectedPrice] = useState(sizes?.[0]?.price || price);  // Ensure default price

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSelectedSize(size);
    const sizePrice = sizes.find((s) => s.size === size)?.price || price; // Default to item price for non-size items
    setSelectedPrice(sizePrice);
  };

  return (
    <div className="food-item">
      <img src={image} alt={name} className="food-item-image" />
      <h3>{name}</h3>
      <p>{description}</p>

      {/* Size Selector */}
      {sizes && sizes.length > 0 ? (
        <div className="food-item-sizes">
          <label htmlFor={`size-${id}`}>Choose Size: </label>
          <select id={`size-${id}`} value={selectedSize} onChange={handleSizeChange}>
            {sizes.map((size, index) => (
              <option key={index} value={size.size}>
                {size.size}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      {/* Price Display */}
      <p className="food-item-price">Price: Rs {selectedPrice}</p>

      {/* Add to Cart Button */}
      {cartItems[`${id}-${selectedSize}`] ? (
        <div className="food-item-counter">
          <img
            onClick={() => removeFromCart(id, selectedSize)}
            src={assets.remove_icon_red}
            alt="Remove"
            style={{ width: '24px', height: '24px' }}
          />
          <p>{cartItems[`${id}-${selectedSize}`]}</p>
          <img
            onClick={() => addToCart(id, selectedSize)}
            src={assets.add_icon_green}
            alt="Add"
            style={{ width: '24px', height: '24px' }}
          />
        </div>
      ) : (
        <div className="add-container">
          <img
            className="add-icon"
            onClick={() => addToCart(id, selectedSize)}
            src={assets.add_icon_white}
            alt="Add"
            style={{ width: '24px', height: '24px' }}
          />
        </div>
      )}
    </div>
  );
};

export default FoodItem;