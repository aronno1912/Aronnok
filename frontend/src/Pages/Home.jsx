import React from 'react'
import Trending from '../Components/Trending/Trending';
import Cover from '../Components/Cover/Cover';
import Footer from  '../Components/Footer/Footer';

const Home = () => {
  return (
    <div>
      <Cover/>
      <Trending catagory="Trending" mypath="http://localhost:8000/api/products/659c027001b07da1b7fef185"/>
      <Trending catagory="Recommended for you" mypath ="http://localhost:8000/api/recommend/659c027001b07da1b7fef185"/>
      <Footer/>
    </div>
  )
}

export default Home
