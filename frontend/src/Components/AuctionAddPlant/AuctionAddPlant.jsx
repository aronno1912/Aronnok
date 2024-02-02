


// // AdminAddProductForm.jsx
import React, { useState } from 'react';
import './AuctionAddPlant.css';
import axios from 'axios';

const AuctionAddPlant = ({ auctionId}) => {
  const [productInfo, setProductInfo] = useState({
    name: '',
    description: '',
    initialbid: 0,
    photo: null,
    photoName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // const fileName = `${Date.now()}_${file.name}`;
    setProductInfo((prevInfo) => ({
      ...prevInfo,
      photo: file,
      photoName: file.name,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e)
    try {
      const formData = new FormData();
      // const file = e.target.files[0];
      for (const key in productInfo) {
        formData.append(key, productInfo[key]);
      }
      // formData.append('file', file);

      // console.log(formData)
      // // Iterate over FormData entries and log key-value pairs
      // for (const pair of formData.entries()) {
      //   console.log(pair[0], pair[1]);
      // }
      await axios.post(`http://localhost:8000/api/auction/add-product/${auctionId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('New product added successfully!');
      setProductInfo({
        name: '',
        description: '',
        initialbid: 0,
        photo: null,
        photoName: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="admin-add-product-form">
      <form onSubmit={handleSubmit}>
        <div className="form-left">
          <label htmlFor="name">Product Name</label>
          <input type="text" id="name" name="name" value={productInfo.name} onChange={handleChange} required />

          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" value={productInfo.description} onChange={handleChange} required />
        </div>

        <div className="form-right">
          

          <label htmlFor="initialbid">Initial Bid</label>
          <input type="number" id="initialbid" name="initialbid" value={productInfo.initialbid} onChange={handleChange} required />

          <label htmlFor="photo">Upload Photo</label>
          <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} required />

          <button className='addProductAdminButton' type="submit">Add Product</button>
          
        </div>
      </form>
    </div>
  );
};

export default AuctionAddPlant;

