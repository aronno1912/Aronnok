import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import Favourites from './Pages/Favourites';
import Product from './Pages/Product';
import ViewCart from './Pages/ViewCart';
import Login from './Pages/Login';
import ViewProduct from './Pages/ViewProduct';
import OrderlistAdmin from './Pages/OrderlistAdmin';
import OrderDetailsAdmin from './Pages/OrderDetailsAdmin';

import { BrowserRouter,Routes, Route } from 'react-router-dom';
import AdminAllProductPage from './Pages/AdminAllProductPage';
import AdminNewProductAdd from './Components/AdminNewProductAdd/AdminNewProductAdd';
import AdminAddProductPage from './Pages/AdminAddProductPage';


function App() {
  return (
    <div>
      <BrowserRouter>
      
      <Routes>
        <Route path='/' element={<Home/>}/>
        {/*========================just for test purpose i am linking favourites to view product page =================================================*/}
        <Route path='/favourites' element={<Favourites/>}/>
        <Route path='/product' element={<Product/>}>
          {/* <Route path=':productId' element={<Product/>}/> */}
        </Route>
        <Route path='/viewcart' element={<ViewCart/>}/>
        <Route path='/product/:productId' element={<ViewProduct />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin/orderlist' element={<OrderlistAdmin/>}/>
        <Route path='/admin/orderlist/order-details/:orderId' element={<OrderDetailsAdmin/>}/>
        <Route path='/admin/allproducts' element={<AdminAllProductPage/>}/>
        <Route path='/admin/allproducts/addplant' element={<AdminAddProductPage/>}/>

      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
