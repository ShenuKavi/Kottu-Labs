import React, { useState } from 'react';
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify';

const Add = ({url}) => {

    
    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        size:"",
        category:"Kottu varieties",
        price:""
    })

    const onChangeHandler =(event)=> {
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

   const onSubmitHandler = async(event)=>{
       event.preventDefault();
       const formData = new FormData();
       formData.append("name",data.name)
       formData.append("description",data.description)
       formData.append("category",data.category)
       formData.append("size",data.size)
       formData.append("price",Number(data.price))
       formData.append("image",image)
       const response = await axios.post(`${url}/api/food/add`,formData);
       if (response.data.success){
          setData({
            name:"",
            description:"",
            category:"Kottu varieties",
            size:"Regular",
            price:""
        })
        setImage(false)
        toast.success(response.data.message)
       }
       else {
        toast.error(response.data.message)
       }

   }

  return (
    <div>
       <div className="add">
        <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
            <p>Upload Image</p>
            <label htmlFor="image">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
        </div>
        <div className="add-product-name flex-col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here'/>
        </div>
        <div className="add-product-description flex-col">
            <p>Product description</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>

        </div>
        <div className="add-category-price">
            <div className="add-category flex-col">
                <p>Product category</p>
                <select onChange={onChangeHandler} name="category">
                    <option value="Kottu varieties">Kottu varieties</option>
                    <option value="Roti Wraps">Roti Wraps</option>
                    <option value="Parata Meal">Parata Meal</option>
                    <option value="Devilled Dishes">Devilled Dishes</option>
                    <option value="Fried Rice">Fried Rice</option>
                    <option value="Pasta">Pasta</option>
                    <option value="KL Inventions">KL Inventions</option>
                    <option value="Beverages">Beverages</option>
                </select>
            </div>
            <div className="add-size flex-col">
                <p>Size</p>
                <select onChange={onChangeHandler} name="size">
                    <option value="Regular">Regular</option>
                    <option value="Large">Large</option>
                    <option value="Family sawan">Family sawan</option>
                    <option value="Party sawan">Party sawan</option>
                    <option value="N/A">N/A</option>
                </select>
            </div>
            <div className="add-price flex-col">
                <p>Product price</p>
                <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='Rs 1000'/>
            </div>
        </div>
        <button type='submit' className='add-btn'>ADD</button>
        </form>
       </div>
      
    </div>
  )
}

export default Add
