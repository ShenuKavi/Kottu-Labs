import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/Fooditem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  console.log("Food List Data in FoodDisplay:", food_list); // Log to check the data

  return (
    <div className="food-display">
      <h2>Top Dishes Near You</h2>
      <div className="food-display-list">
        {food_list && food_list.length > 0 ? (
          food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  description={item.description}
                  sizes={item.sizes || []}  // Pass empty array if sizes is undefined
                  price={item.price || 0} // Pass price directly for items without sizes
                />
              );
            }
            return null; // Return null for items that don't match the category
          })
        ) : (
          <div>No food items available</div>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;