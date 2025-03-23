import React, { useContext, useState } from 'react'; 
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {
  const { cartItems, food_list } = useContext(StoreContext);

  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    contact: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('COD'); // Default payment method

  // Calculate total price of items in the cart
  const calculateTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [key, quantity]) => {
      const [id, size] = key.split('-');
      const item = food_list.find((food) => food._id === id);
      const selectedSize = item.sizes ? item.sizes.find((s) => s.size === size) : null;
      const price = selectedSize ? selectedSize.price : item.price;
      return total + price * quantity;
    }, 0).toFixed(2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = () => {
    if (!userDetails.name || !userDetails.address || !userDetails.contact) {
      alert('Please fill in all the fields');
      return;
    }
    alert('Order placed successfully!');
    // Here, you can add further logic like saving order to the backend
  };

  return (
    <div className="place-order-container">
      <div className="order-summary">
        <h2>Order Summary</h2>
        <div className="order-items">
          {Object.entries(cartItems).map(([key, quantity]) => {
            const [id, size] = key.split('-');
            const item = food_list.find((food) => food._id === id);
            const selectedSize = item.sizes ? item.sizes.find((s) => s.size === size) : null;
            const price = selectedSize ? selectedSize.price : item.price;
            return (
              <div className="order-item" key={key}>
                <img src={item.image} alt={item.name} />
                <div>
                  <p>{item.name} ({selectedSize ? size : 'Default'})</p>
                  <p>Rs. {price.toFixed(2)} x {quantity}</p>
                </div>
                <p>Rs. {(price * quantity).toFixed(2)}</p>
              </div>
            );
          })}
        </div>
        <div className="total-price">
          <p>Total: Rs. {calculateTotalPrice()}</p>
        </div>
      </div>

      <div className="user-details">
        <h2>User Details</h2>
        <form>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={userDetails.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Your Address"
            value={userDetails.address}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="Your Contact Number"
            value={userDetails.contact}
            onChange={handleChange}
            required
          />
        </form>
      </div>

      <div className="payment-method">
        <h2>Payment Method</h2>
        <div className="payment-options">
          <label>
            <input
              type="radio"
              value="COD"
              checked={paymentMethod === 'COD'}
              onChange={handlePaymentMethodChange}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              value="Card"
              checked={paymentMethod === 'Card'}
              onChange={handlePaymentMethodChange}
            />
            Credit/Debit Card
          </label>
        </div>
      </div>

      <button className="place-order-btn" onClick={handlePlaceOrder}>
        Place Order
      </button>
    </div>
  );
};

export default PlaceOrder;