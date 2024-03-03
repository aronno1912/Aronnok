import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import Favourites from './Pages/Favourites';
import ViewCart from './Pages/ViewCart';
import Login from './Pages/Login';
import ViewProduct from './Pages/ViewProduct';
import OrderlistAdmin from './Pages/OrderlistAdmin';
import OrderDetailsAdmin from './Pages/OrderDetailsAdmin';

import { BrowserRouter,Routes, Route } from 'react-router-dom';
import AdminAllProductPage from './Pages/AdminAllProductPage';
import AdminNewProductAdd from './Components/AdminNewProductAdd/AdminNewProductAdd';
import AdminAddProductPage from './Pages/AdminAddProductPage';

import UserProfile from './Components/UserProfile/UserProfile';
import UserProfilePage from './Pages/UserProfilepage';

import OrderStatus from './Pages/OrderStatus';
import OrderList from './Pages/OrderList';
import Auction from './Components/Auction/Auction';

import AdminCreateAuction from './Pages/AdminCreateAuction';

import AuctionsAll from './Pages/AuctionsAll';
import OneAuction from './Pages/OneAuction';
import PaymentSuccess from './Pages/PaymentSuccess';
import PaymentFail from './Pages/PaymentFail';
import AdminViewAuctionPage from './Pages/AdminViewAuctionPage';

import AdAuctionProductList from './Components/AdAuctionProductList/AdAuctionProductList';
import PastAuctionsPage from './Pages/PastAuctionspage';
import OngoingAucAdmin from './Pages/OngoingAucadmin';
import AdAuctionProductBids from './Pages/AdAuctionProductBids';
import AuctionUpcoming from './Pages/AuctionUpcoming';
import AuctionPast from './Pages/AuctionPast';
import ViewAucReqPage from './Pages/ViewAucReqPage';

import SignupPage2 from './Pages/SignupPage2';
import AuctionWinProducts from './Pages/AuctionWinProducts';
import AdminDashboard from './Pages/AdminDashboard';
import Wishlist from './Pages/Wishlist';
import ViewSellRequestPage from './Pages/ViewSellRequestPage';
import ReviewAddProductPage from './Pages/ReviewAddProductPage';
import AllUsers from './Pages/AllUsers';
import EditProductPageAd from './Pages/EditProductPageAd';
import UserProfilePageAdmin from './Pages/UserProfilePageAdmin';


function App() {
  return (
    <div>
      <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/abcd' element={<SignupPage2/>}/>
        <Route path='/home/:userId' element={<Home/>}/>
        {/*========================just for test purpose i am linking favourites to view product page =================================================*/}
        <Route path='/admin/createauction' element={<AdminCreateAuction/>}/>
        <Route path='/profile/:userId' element={<UserProfilePage/>}/>
        <Route path='/admin/viewprofile/:userId' element={<UserProfilePageAdmin/>}/>
        
        <Route path='/viewcart/:userId' element={<ViewCart/>}/>
        <Route path='/:category/:userId/:productId' element={<ViewProduct />} />
        {/* <Route path='/comingsoon/product/:userId/:productId' element={<ViewComingSoonProduct />} /> */}
        <Route path='/login' element={<Login/>}/>
        <Route path='/orderlist/:userId' element={<OrderList/>}/>
        <Route path='/orderstatus/:userId/:orderId' element={<OrderStatus/>}/>
        <Route path='/auction/upcoming/:userId/:auctionId' element={<AuctionUpcoming/>}/>
        <Route path='/auction/ongoing/:userId/:auctionId' element={<OneAuction/>}/>
        <Route path='/auction/completed/:userId/:auctionId' element={<AuctionPast/>}/>
        <Route path='/auctionsall/:userId' element={<AuctionsAll/>}/>
        <Route path='/auction/payProducts/:userId/:auctionId' element={<AuctionWinProducts/>}/>
        
        


        <Route path='/admin/viewauctions/upcoming/:auctionId/viewrequests' element={<ViewAucReqPage/>}/>
        <Route path='/admin/orderlist' element={<OrderlistAdmin/>}/>
        <Route path='/admin/orderlist/order-details/:orderId' element={<OrderDetailsAdmin/>}/>
        <Route path='/admin/allproducts' element={<AdminAllProductPage/>}/>
        <Route path='/admin/allproducts/addplant' element={<AdminAddProductPage/>}/>
        <Route path='/payment/success/:transId' element={<PaymentSuccess/>}/>
        <Route path='/payment/fail/:transId' element={<PaymentFail/>}/>
       
        <Route path='/admin/viewauctions' element={<AdminViewAuctionPage/>}/>
        <Route path='/admin/viewauctions/:catagory/:auctionId' element={<PastAuctionsPage/>}/>
        <Route path='/admin/viewauctions/ongoing/:auctionId' element={<OngoingAucAdmin/>}/>

        <Route path='/admin/viewsellrequests' element={<ViewSellRequestPage/>}/>
        <Route path='/admin/viewsellrequests/review' element={<ReviewAddProductPage/>}/>
        
        <Route path='/auction/:auctionId/:productId/bids' element={<AdAuctionProductBids/>}/>
        <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='/wishlist/:userId' element={<Wishlist/>}/>
        <Route path='/favourites/:userId' element={<Favourites/>}/>
        <Route path='/allusers' element={<AllUsers/>}/>
        <Route path='/editproduct/:productId' element={<EditProductPageAd />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
