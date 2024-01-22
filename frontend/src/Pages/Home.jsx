import React from 'react'
import Trending from '../Components/Trending/Trending';
import Cover from '../Components/Cover/Cover';
const Home = () => {
  return (
    <div>
      <Cover/>
      <Trending catagory="Trending"/>
      <Trending catagory="Recommended for you"/>
    </div>
  )
}

export default Home
