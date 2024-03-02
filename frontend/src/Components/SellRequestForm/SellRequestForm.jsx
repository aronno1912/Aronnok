


// // clientAddProductForm.jsx
import React, { useState,onClose } from 'react';
import './SellRequestForm.css';
import axios from 'axios';

const SellRequestForm = ({ userId,onClose}) => {
  const [productInfo, setProductInfo] = useState({
    name: '',
    sciname:'',
    description: '',
    ap: 0,
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
      await axios.post(`http://localhost:8000/api/sellRequest/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Your request is sent to Admin successfully!');
      setProductInfo({
        name: '',
        sciname:'',
        description: '',
        ap: 0,
        photo: null,
        photoName: '',
      });
      onClose(); 
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="popup-overlay">
    <div className="client-add-product-form">
    <button className="close-buttonsell" onClick={onClose}>
          &times;
        </button>
      <form onSubmit={handleSubmit}>
        <div className="form-left">
          <label htmlFor="name">Product Name</label>
          <input type="text" id="name" name="name" value={productInfo.name} onChange={handleChange} required />
          <label htmlFor="sciname">Scientific Name</label>
          <input type="text" id="sciname" name="sciname" value={productInfo.sciname} onChange={handleChange} required />
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" value={productInfo.description} onChange={handleChange} required />
        </div>

        <div className="form-right">
          

          <label htmlFor="ap">Asking Price</label>
          <input type="number" id="ap" name="ap" value={productInfo.ap} onChange={handleChange} required />

          <label htmlFor="photo">Upload Photo</label>
          <input type="file" id="photo" name="photo" accept="image/*" onChange={handleFileChange} required />

          <button className='addProductclientButton' type="submit">Add Product</button>
          
        </div>
      </form>
    </div>
    </div>
  );
};

export default SellRequestForm;

