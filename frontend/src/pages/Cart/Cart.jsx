import React, { useContext, useEffect } from "react";
import './Cart.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    navigate('/order');
  };

  // Calculate total items and total price
  const totalItems = Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
  const totalPrice = Object.entries(cartItems).reduce((total, [key, quantity]) => {
    const [id, size] = key.split('-');
    const item = food_list.find((food) => food._id === id);
    if (!item) return total; // Skip if item is not found

    // Handle items without sizes
    const selectedSize = item.sizes?.find((s) => s.size === size);
    const price = selectedSize ? selectedSize.price : item.price;
    return total + price * quantity;
  }, 0).toFixed(2);

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <p>Review your items and proceed to checkout</p>
      </div>

      <div className="cart-items">
        {totalItems > 0 ? (
          <>
            <div className="cart-items-title">
              <p>Item</p>
              <p>Title</p>
              <p>Size</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Action</p>
            </div>
            <hr />

            {Object.entries(cartItems).map(([key, quantity]) => {
              const [id, size] = key.split('-');
              const item = food_list.find((food) => food._id === id);

              if (!item) return null; // Skip if item not found

              const selectedSize = item.sizes?.find((s) => s.size === size);
              const price = selectedSize ? selectedSize.price : item.price;

              return (
                <div className="cart-item" key={key}>
                  <div className="cart-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <p className="cart-item-title">{item.name}</p>
                  <p className="cart-item-size">{selectedSize ? size : 'Default'}</p>
                  <p className="cart-item-price">Rs. {price.toFixed(2)}</p>
                  <p className="cart-item-quantity">{quantity}</p>
                  <p className="cart-item-total">Rs. {(price * quantity).toFixed(2)}</p>
                  <button className="remove-btn" onClick={() => removeFromCart(id, size)}>
                    Remove
                  </button>
                </div>
              );
            })}
          </>
        ) : (
          <p className="empty-cart-message">Your cart is empty.</p>
        )}
      </div>

      {totalItems > 0 && (
        <div className="cart-summary">
          <div className="summary-row">
            <p>Total Items:</p>
            <p>{totalItems}</p>
          </div>
          <div className="summary-row">
            <p>Total Price:</p>
            <p>Rs. {totalPrice}</p>
          </div>

          <button className="checkout-btn" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;    