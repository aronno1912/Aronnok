import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar/Navbar'
import '../Context/OrderList.css';
import CurrentOrderItem from '../Components/CurrentOrderItem/CurrentOrderItem';
import { useParams } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';

const OrderList2 = () => {
    const { userId } = useParams();

    const [orders, setOrder] = useState([]);
    const [curorders, setCurOrder] = useState([]);
    const [prevorders, setPrevOrder] = useState([]);
    const [curdisplayItems, setCurDisplayItems] = useState(4);
    const [prevdisplayItems, setPrevDisplayItems] = useState(4);
    const [totalCurPrice, setTotalCurPrice] = useState(0);
    const [isTotal, setIsTotal] = useState(true);

    useEffect(() => {

        const divideOrders = async (orders) => {
            setPrevOrder([]);
            setCurOrder([]);
           
            for (const order of orders) {
              if(order.status==="Delivered"){
                setPrevOrder((prevOrders) => [...prevOrders, order]);
                
              }
              else{
                setCurOrder((prevOrders) => [...prevOrders, order]);
                setTotalCurPrice(Math.round(totalCurPrice+order.amount));
              }
            }
            
       };
        const fetchOrders = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/order/particularHistory/${userId}`);
                const data = await response.json();
                setOrder(data);
                divideOrders(data);
            } catch (error) {
              console.error('Error fetching product data:', error);
            }
          };

          const intervalId = setInterval(() => {
            fetchOrders();
          }, 3000);
      
          return () => clearInterval(intervalId);
         
      }, []);

      const moreCurItems=()=>{
        setCurDisplayItems(curdisplayItems+4)
      }

      const morePrevItems=()=>{
        setPrevDisplayItems(prevdisplayItems+4)
      }

      const lessCurItems=()=>{
        setCurDisplayItems(curdisplayItems-4)
      }

      const lessPrevItems=()=>{
        setPrevDisplayItems(prevdisplayItems-4)
      }
  return (
    <div>
       
        <div className="orderlist-alltotals">
            <div className="orderlist-currentorders">
             
            <i className="bi bi-file-earmark-bar-graph" style={{ fontSize: '30px', color: 'rgb(255, 255, 255)', marginTop:'20px'}}></i>
                <p>Current orders: {curorders.length}</p>
                {/* <p>Total Price: {totalCurPrice}</p> */}
            </div>
            <div className="orderlist-totalorders">
            <i className="bi bi-bag-check" style={{ fontSize: '30px', color: 'rgb(255, 255, 255)' }}></i>
                <p>Total Orders: {curorders.length+prevorders.length}</p>
            </div>
        </div>
        <div className="orderlist-recent-title">
            <p style={{fontSize:'25px', color:"rgb(17, 77, 44)"}}><b>Current Orders</b></p>
            <hr style={{width:"150px", margin:"0", border:"2px solid", borderRadius:"10px"}}/>
        </div>
        <div className="current-orderlist-orders">
            {curorders.slice(0, curdisplayItems).map((item,i)=>{
            return <CurrentOrderItem key={i} id={item._id} userId={userId}/>
            })}
        </div>
         <br/>
         <br/>
        <div className="orderlist-more">
            {(curdisplayItems < curorders.length && curorders.length>4) && (
                <button className="orderlist-more-btn" onClick={moreCurItems}>Show more...</button>
            )}

            {(curdisplayItems > 4 && curorders.length>4) && (
                <button className="orderlist-more-btn" onClick={lessCurItems}>Show less...</button>
            )}
        </div>
      

        <div className="orderlist-recent-title">
        
            

            <p style={{fontSize:'25px', color:"rgb(17, 77, 44)"}}><b>Previous Orders</b></p>
            <hr style={{width:"150px", margin:"0", border:"2px solid", borderRadius:"10px"}}/>
        </div>
        <div className="current-orderlist-orders">
            {prevorders.slice(0, prevdisplayItems).map((item,i)=>{
            return <CurrentOrderItem key={i} id={item._id} userId={userId}/>
            })}
        </div>

        <div className="orderlist-more">
            {(prevdisplayItems < prevorders.length && prevorders.length>4) && (
                <button className="orderlist-more-btn" onClick={morePrevItems}>Show more...</button>
            )}

            {(prevdisplayItems > 4  && prevorders.length>4) && (
                <button className="orderlist-more-btn" onClick={lessPrevItems}>Show less...</button>
            )}
        </div>
       

         {/* {(prevdisplayItems < prevorders.length ||prevdisplayItems<=4) ? ( 
            <button className="orderlist-more-btn" onClick={morePrevItems}>more...</button>
         ):(
            <button className="orderlist-more-btn" onClick={lessPrevItems}>less...</button>
        )} */}
    
    </div>
  )
}

export default OrderList2
