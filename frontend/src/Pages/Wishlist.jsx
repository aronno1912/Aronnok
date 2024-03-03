import React from 'react';
import Wishlist from '../Components/Wishlist/Wishlist';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { userId,wishlistPlantId } = useParams();

  return (
   <div>
      <Navbar userId={userId} menu={"wishlist"}/>
      <Wishlist category="Wishlist" mypath={`http://localhost:8000/api/wishlist/${userId}`} userId={userId} wishlistPlantId={wishlistPlantId}/>
      <Footer/>
    </div>
  );
};

export default Home;
