
// import React, { useContext } from 'react';
import './EditProduct.css';
import star_icon from '../Assets/star_icon.png';
import dull_star_icon from '../Assets/star_dull_icon.png';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { API } from "../../backend";
import { useParams } from 'react-router-dom';
// import { ProjectContext } from '../../Context/ProjectContext';



// const EditProduct = () => {
//   const { productId,userId } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   // const [totalQuantity, setQuantity] = useState(0);
//   const {totalQuantity,updateTotalQuantity}=useContext(ProjectContext);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8000/api/product/65a294c44865e9f4138c7281/${productId}`);
//         console.log("id is ",productId);
//         setProduct(response.data);
//       } catch (error) {
//         console.error('Error fetching product data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

   
//     fetchProduct();
//     //fetchTotalQuantity();
//   }, [productId,userId]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (!product) {
//     return <p>Product not found</p>;
//   }


//   const isInStock = product.stock > 0;
//   const imageUrl = product.photo || ''; // Default to an empty string if product.photo is undefined


//   return (
//     <div className='editproduct'>
//       <div className="editproduct__left">
//         <div className="editproduct__left__img">
//           {/* <img className='main-img' src={product.photo} alt="Bansaiitis" /> */}
//           {imageUrl && (
//         <img className='main-img' src={product.photo} alt={product.name} />
//       )}
//         </div>
//         <p>Stock :{product.stock}</p>
     
//       </div>
//       <div className="editproduct__right">
//         <h1>{product.name}</h1>
//         <div className="editproduct__right__rating">
//           <img src={star_icon}alt="" />
//           <img src={star_icon}alt="" />
//           <img src={star_icon}alt="" />
//           <img src={star_icon}alt="" />
//           <img src="/star_dull_icon.png" alt="" />
//           <p>(122)</p>
//           </div>

//         <div className="prouctdisplay-right-prices" >
//           <div className="prouctdisplay-right-prices-new">
//             ${product.price}
//           </div>
//           <div className="productdisplay-right-description">
//             {product.description}
//           </div>


//         </div>
      
   
//       </div>
//     </div>
//   )
// }

// export default EditProduct;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProduct = () => {
 const { productId, userId } = useParams();
 const [product, setProduct] = useState(null);
 const [loading, setLoading] = useState(true);
 const [isEditing, setIsEditing] = useState(false);
 const [editedProduct, setEditedProduct] = useState({
   description: '',
   price: 0,
   stock: 0,
 });

 useEffect(() => {
   const fetchProduct = async () => {
     try {
       const response = await axios.get(`http://localhost:8000/api/product/65a294c44865e9f4138c7281/${productId}`);
       setProduct(response.data);
       setEditedProduct({
         description: response.data.description,
         price: response.data.price,
         stock: response.data.stock,
       });
     } catch (error) {
       console.error('Error fetching product data:', error);
     } finally {
       setLoading(false);
     }
   };

   fetchProduct();
 }, [productId, userId]);

 const handleEditToggle = () => {
   setIsEditing(!isEditing);
 };

 const handleInputChange = (e) => {
   const { name, value } = e.target;
   setEditedProduct((prevProduct) => ({
     ...prevProduct,
     [name]: value,
   }));
 };

 const handleDelete = async () => {
   //firstly show an alert to confirm the deletion
   if(window.confirm('Are you sure you want to delete this product?')){
   try {
   
     await axios.delete(`http://localhost:8000/api/product/${productId}/65a294c44865e9f4138c7281`);
     console.log('Product deleted successfully');
     window.location.href = '/admin/allproducts';
   } catch (error) { 
     console.error('Error deleting product:', error);
   }
  }
 };

 const handleSaveChanges = async () => {
   try {
     await axios.put(`http://localhost:8000/api/product/${productId}/65a294c44865e9f4138c7281`, {
       description: editedProduct.description,
       price: editedProduct.price,
       stock: editedProduct.stock,
     });

     // You may want to fetch the updated product data again after successful update
     // const response = await axios.get(`http://localhost:8000/api/product/${userId}/${productId}`);
     // setProduct(response.data);

     // Toggle back to viewing mode
     setIsEditing(false);
   } catch (error) {
     console.error('Error updating product:', error);
   }
   //refresh the page
   window.location.reload();
 };

 if (loading) {
   return <p>Loading...</p>;
 }

 if (!product) {
   return <p>Product not found</p>;
 }

 const isInStock = product.stock > 0;

 return (
   <div className='editproduct'>
   
     <div className="editproduct__left">
    
       <div className="editproduct__left__img">
         {product.photo && (
           <img className='main-img' src={product.photo} alt={product.name} />
         )}
       </div>
       <p style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>📦Stock:  {product.stock}</p>
       <p style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>💼Sold:  {product.sold}</p>
       <button className='deleteproduct' onClick={handleDelete}>Delete Product</button>

     </div>

   
     <div className="editproduct__right">
     
       <h1>{product.name}</h1>
       <div className='editproduct__header'>
       <button className='adeditButton1' onClick={handleEditToggle}>{isEditing ? 'Cancel' : 'Edit'}</button>
       {isEditing && <button className='adeditsaveButton2' onClick={handleSaveChanges}>Save Changes</button>}
     </div>
       <div className="editproduct__right__rating">
         <img src={star_icon} alt="" />
         <img src={star_icon} alt="" />
         <img src={star_icon} alt="" />
         <img src={star_icon} alt="" />
         <img src="/star_dull_icon.png" alt="" />
         <p>(122)</p>
       </div>

       {isEditing ? (
         <div className="editproduct__input-fields">
           <label htmlFor="description">Description:</label>
           <input
             type="text"
             id="description"
             name="description"
             value={editedProduct.description}
             onChange={handleInputChange}
           />
           <label htmlFor="price">Price:</label>
           <input
             type="number"
             id="price"
             name="price"
             value={editedProduct.price}
             onChange={handleInputChange}
           />
           <label htmlFor="stock">Stock:</label>
           <input
             type="number"
             id="stock"
             name="stock"
             value={editedProduct.stock}
             onChange={handleInputChange}
           />
         </div>
       ) : (
         <div className="prouctdisplay-right-prices">
           <div className="prouctdisplay-right-prices-new">
             ${product.price}
           </div>
           <div className="productdisplay-right-description">
             {product.description}
           </div>
         </div>
       )}
     </div>
   </div>
 );
};

export default EditProduct;
