// import React from 'react'
// import Trending from '../Components/Trending/Trending';
// import Cover from '../Components/Cover/Cover';
// import Footer from  '../Components/Footer/Footer';
// import Navbar from '../Components/Navbar/Navbar';
// import { useParams } from 'react-router-dom';

// const Home = () => {
//   const  userId  = useParams();
//   return (
//     <div>
//       <Navbar/>
//       <Cover/>
//       <Trending catagory="Trending" mypath="http://localhost:8000/api/trending"/>
//       <Trending catagory="Recommended for you" mypath =`http://localhost:8000/api/recommend/${userId}`/>
//       <Footer/>
//     </div>
//   )
// }

// export default Home
import React from 'react';
import Trending from '../Components/Trending/Trending';
import Cover from '../Components/Cover/Cover';
import Footer from '../Components/Footer/Footer';
import Navbar from '../Components/Navbar/Navbar';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { userId } = useParams();

  return (
   <div>
      <Navbar userId={userId} menu={"home"}/>
      <Cover userId={userId}/>
      <Trending catagory="Trending" mypath="http://localhost:8000/api/trending" userId={userId}/>
      <Trending catagory="New Arrivals" mypath="http://localhost:8000/api/product/newarrival"  userId={userId}/>
      <Trending catagory="Recommended for you" mypath={`http://localhost:8000/api/recommend/${userId}`}  userId={userId} />
      <Trending catagory="Coming Soon" mypath={`http://localhost:8000/api/product/comingsoon`}  userId={userId} />
      <Footer />
    </div>
  );
};

export default Home;
