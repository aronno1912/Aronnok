import React, { useEffect, useState } from 'react'
import '../Context/OrderStatus.css';
import Stepper from '../Components/Stepper/Stepper'
import Navbar from '../Components/Navbar/Navbar'
import OrderItem from '../Components/OrderItem/OrderItem';
import { useParams } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';

const OrderStatus = () => {
    const { userId, orderId } = useParams();
    const [order, setOrder] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [totalOrderQuantity, setTotalQuantity] = useState(0);
    const [date, setDate] = useState("");

    // const fetchProduct = async (productId) => {
    //     try {
    //       // Assuming you have an API endpoint for fetching data based on productId
    //       const response = await fetch(`http://localhost:8000/api/product/659c027001b07da1b7fef185/${productId}`);
    //       const data = await response.json();
    //       return data;
    //     } catch (error) {
    //       console.error('Error fetching data from MongoDB:', error);
    //       return null;
    //     }
    //   };


    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/order/particularOrder/${orderId}`);
                const data = await response.json();
                console.log(data)
                setOrder(data);
                setOrderItems(data.products);
                setDate(data.placedOn.substring(0, 10));
                let total=0;
                for (const item of data.products) {
                    // console.log("item q: " + item.quantity);
                    total += item.quantity;
                }
                setTotalQuantity(total);
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        // const getTotalQuantity = async () => {
        //     let total = 0;
        //     console.log("order items")
        //     console.log(orderItems)
        //     for (const item of orderItems) {
        //         console.log("item q: " + item.quantity);
        //         total += item.quantity;
        //     }
        //     console.log("total quantity: " + total);
        //     setTotalQuantity(total);
        // }

        const intervalId = setInterval(() => {
            fetchOrder();
            // getTotalQuantity();
        }, 3000);

        return () => clearInterval(intervalId);

    }, []);



    return (
        <div>
            <Navbar userId={userId} />
            <div className="orderstatus-container">
                <div className="orderstatus-order-id">
                    <p><b>Order Id: {order._id}</b></p>
                </div>
                <div className="orderstatus-order-dates">
                    <p><b>Order date:  {date}</b></p>
                </div>
                <hr style={{ color: "rgb(160, 161, 160)", width: "85%" }} />
                <div className="orderstatus-order-progress-bar">
                    <Stepper status={order.status} />
                </div>
                <div className="orderstatus-orderitems-title">
                    <p style={{ fontSize: '25px', color: "rgb(17, 77, 44)" }}><b>Order items</b></p>
                    <hr style={{ width: "150px", margin: "0", border: "2px solid", borderRadius: "10px" }} />
                </div>
                <div className="order-items-header">
                    <div className="order-items-header-p">
                        <p><b>Products</b></p>
                        <p style={{marginRight:"70px"}}><b>Sub Total</b></p>
                    </div>
                    <hr style={{ position: "absolute", top: "40px", width: "700px" }} />
                </div>
                <div className="orderstatus-orderitems">
                    {orderItems.map((item, i) => {
                        return <OrderItem key={i} id={item.product} quantity={item.quantity} status={order.status} />
                    })}
                </div>
                <div className="delivery-and-summary">
                    <div className="delivery-left">
                        <p><b>Address: {order.address}</b></p>
                        <p><b>Payment: cash on delivery</b></p>
                    </div>
                    <div className="summary-right">
                        <p><b>Total-amount: ${Math.round(order.amount)}</b></p>
                        <p><b>Total-quantity: {totalOrderQuantity}</b></p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default OrderStatus
