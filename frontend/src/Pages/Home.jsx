import React from 'react'
import Trending from '../Components/Trending/Trending';
import Cover from '../Components/Cover/Cover';
import Footer from  '../Components/Footer/Footer';

const Home = () => {
  return (
    <div>
      <Cover/>
      <Trending/>
      <Footer/>
    </div>
  )
}

export default Home
