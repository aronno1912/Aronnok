


// // AdminAddProductForm.jsx
import React, { useState } from 'react';
import './ReviewAdd.css';
import axios from 'axios';

const ReviewAdd = ({pname,pdescription,pprice,pphoto,reqId}) => {
  // const [url, setUrl] = useState("");
  // const [photo, setFile] = useState (null);
  console.log("pname: "+pname)
  console.log("pdescription: "+pdescription)
    console.log("pprice: "+pprice)
    console.log("pphoto: "+pphoto)
  console.log(reqId)
  const [productInfo, setProductInfo] = useState({
    name: pname,
    description: pdescription,
    category: '',
    stock: 0,
    sold: 0,
    tag: '',
    price: pprice,
    photo: pphoto,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  

  const handleSubmit = async (e) => {
   

    e.preventDefault();
    console.log("e:")
    console.log(e)
    try {
      const formData = new FormData();
      // const file = e.target.files[0];
      // console.log("file: "+file)
      for (const key in productInfo) {
        formData.append(key, productInfo[key]);
      }
      // formData.append('photo', photo);

      console.log(formData)
      
    
      await axios.post(`http://localhost:8000/api/requestApproval/65a294c44865e9f4138c7281/${reqId}`, formData, {
      headers: {
      'Content-Type': 'multipart/form-data',
      },
      });
      
      alert('New product added successfully!');
      setProductInfo({
        name: '',
        description: '',
        category: '',
        stock: 0,
        sold: 0,
        tag: '',
        price: 0,
        photo: null,
        photoName: '',
      });
     
    
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="reviewadmin-add-product-form">
        <h2>Review before adding product</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-left">
          <label htmlFor="name">Product Name</label>
          <input type="text" id="name" name="name" value={productInfo.name} onChange={handleChange} required />

          <label htmlFor="category">Category</label>
          <select className='ab' id="category" name="category" value={productInfo.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            <option value="Bonsai">Bonsai</option>
            <option value="Cactus">Cactus</option>
            <option value="Hybrid Fruits">Hybrid Fruits</option>
            <option value="Hybrid Flowers">Hybrid Flowers</option>
          </select>

          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" value={productInfo.description} onChange={handleChange} required />
        </div>

        <div className="form-right">
          <label htmlFor="stock">Stock Quantity</label>
          <input type="number" id="stock" name="stock" value={productInfo.stock} onChange={handleChange} required />

          <label htmlFor="sold">Sold</label>
          <input type="number" id="sold" name="sold" value={productInfo.sold} onChange={handleChange} required />

          <label htmlFor="tag">Tag</label>
          <input type="text" id="tag" name="tag" value={productInfo.tag} onChange={handleChange} required />

          <label htmlFor="price">Price</label>
          <input type="number" id="price" name="price" value={productInfo.price} onChange={handleChange} required />

          {/* <label htmlFor="photo">Upload Photo</label>
          <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} required /> */}

          <button className='addProductAdminButton' type="submit">Add Product</button>
        </div>
      </form>
    </div>
  );
};

export default ReviewAdd;

