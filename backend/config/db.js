import mongoose from "mongoose";

export const connectDB = async () => {
   await mongoose.connect('mongodb+srv://shenukavi:SK0918@cluster0.digjb.mongodb.net/KottuLabs').then(()=>console.log("DB Connected"));

}