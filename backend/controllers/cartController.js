import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
      const { userId, itemId } = req.body;
  
      const userData = await userModel.findOne({ _id: userId });
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      let cartData = userData.cartData || {};
      cartData[itemId] = (cartData[itemId] || 0) + 1;
  
      await userModel.findByIdAndUpdate(userId, { cartData });
      return res.json({ success: true, message: "Added to Cart" });
    } catch (error) {
      console.error("Error adding to cart:", error);
      return res.status(500).json({ success: false, message: "Error adding to cart" });
    }
  };
  
  // Remove items from user cart
  const removeFromCart = async (req, res) => {
    try {
      
  
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      if (cartData[req.body.itemId]>0) {
          cartData[req.body.itemId] -= 1;
          
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed From Cart"})
      
    } catch (error) {
      console.log(error);
     res.json({success:false,message:"Error"})
    }
  };
  
  // Fetch user cart data
  const getCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;
    res.json({success:true,cartData})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"})
    
  }
      
} 
  export { addToCart, removeFromCart, getCart };