import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home';
import Favourites from './Pages/Favourites';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import ViewProduct from './Pages/ViewProduct';

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
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/product/:productId' element={<ViewProduct />} />
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
