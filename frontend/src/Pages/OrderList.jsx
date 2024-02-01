import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import '../Context/OrderList.css';
import CurrentOrderItem from '../Components/CurrentOrderItem/CurrentOrderItem';

const OrderList = () => {
    const [products, setProducts] = useState([]);
    const [orders, setOrder] = useState([]);
    const [curorders, setCurOrder] = useState([]);
    const [prevorders, setPrevOrder] = useState([]);
    // const [orderItems, setOrderItems] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/order/particularHistory/659c027001b07da1b7fef185`);
                const data = await response.json();
                setOrder(data);
                // setOrderItems(data.products);
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
          };

          const divideOrders = async () => {
            for (const order of orders) {
              if(order.status==="Delivered"){
                setPrevOrder((prevOrders) => [...prevOrders, order]);
              }
              else{
                setCurOrder((prevOrders) => [...prevOrders, order]);
              }
            }
            console.log("");
            console.log(curorders);
          };

         fetchOrders();
         divideOrders();
      }, []);

  return (
    <div>
        <Navbar/>
        <div className="orderlist-alltotals">
            <div className="orderlist-currentorders">
                <p>Current orders: </p>
                <p>Total Price: </p>
            </div>
            <div className="orderlist-totalorders">
                <p>Total Orders:</p>
            </div>
        </div>
        <div className="orderlist-recent-title">
            <p style={{fontSize:'25px', color:"rgb(17, 77, 44)"}}><b>Current Orders</b></p>
            <hr style={{width:"150px", margin:"0", border:"2px solid", borderRadius:"10px"}}/>
        </div>
        <div className="current-orderlist-orders">
            {curorders.map((item,i)=>{
            return <CurrentOrderItem key={i} id={item._id}/>
            })}
        </div>
    </div>
  )
}

export default OrderList
