import React from 'react'
import Trending from '../Components/Trending/Trending';
import Cover from '../Components/Cover/Cover';
import Footer from  '../Components/Footer/Footer';
import AdminProductPanel from '../Components/AdminProductPanel/AdminProductPanel';
import AdminNavbar from '../Components/AdminNavbar/AdminNavbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import AdminNewProductAdd from '../Components/AdminNewProductAdd/AdminNewProductAdd';
import ReviewAdd from '../Components/AdminNewProductAdd/ReviewAdd';
import { useParams ,useLocation} from 'react-router-dom';

const ReviewAddProductPage = () => {
  const location = useLocation();
  const { pname, pdescription, pprice, pphoto} = location.state;
 // const { pname, pdescription, pprice, pphoto } = useParams();
  return (
    <div>
     
      <AdminNavbar/>
      <Sidebar/>
      {/* <AdminProductPanel catagory="" /> */}
      {/* //////???????????????????????????????????????????????????????????????????/ */}
      <ReviewAdd pname={pname} pdescription={pdescription} pprice={pprice} pphoto={pphoto}/>
      <Footer/>
    </div>
  )
}

export default ReviewAddProductPage