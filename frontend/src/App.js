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

import { BrowserRouter,Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
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
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
