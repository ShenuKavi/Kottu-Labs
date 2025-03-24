import React, { useContext, useEffect } from "react";
import './Cart.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart } = useContext(StoreContext);
  

  return (
    <div className="cart-container">
      <div className="cart-items">
         <div className="cart-items-title">
              <p>Item</p>
              <p>Title</p>
              <p>Size</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Total</p>
              <p>Action</p>
            </div>
            <br/>
            <hr />
            {food_list.map((item,index) =>{
                if(cartItems[item._id]>0)
                {
                  return (
                    <div className="cart-item-title-cart-items-item">
                      <img src={item.image} alt=""/>
                       <p>{item.name}</p>
                       <p>{item.size}</p>
                       <p>{item.price}</p>
                       <p>{cartItems[item._id]}</p>
                       <p>{item.price*cartItems[item._id]}</p>
                       <button>Remove</button>
                    </div>
                  )
                }
})}
</div>
</div>
  )
}        
export default Cart;    