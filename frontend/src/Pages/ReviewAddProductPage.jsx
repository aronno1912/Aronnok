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
  // const location = useLocation();
  // const { pname, pdescription, pprice, pphoto} = location.state;
 // const { pname, pdescription, pprice, pphoto } = useParams();

 const location = useLocation();
  const { search } = location;
  const params = new URLSearchParams(search);

  const pname = params.get('pname');
  const pdescription = params.get('pdescription');
  const pprice = params.get('pprice');
  const pphoto = params.get('pphoto');
  const reqId=params.get('reqId');
  console.log("kahaiouboaiu")
  console.log(reqId);
  return (
    <div>
     
      <AdminNavbar/>
      <Sidebar/>
      {/* <AdminProductPanel catagory="" /> */}
      {/* //////???????????????????????????????????????????????????????????????????/ */}
      <ReviewAdd pname={pname} pdescription={pdescription} pprice={pprice} pphoto={pphoto} reqId={reqId}/>
      <Footer/>
    </div>
  )
}

export default ReviewAddProductPage