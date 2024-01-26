import React from 'react';
import Sidebar from '../Components/Sidebar/Sidebar';
import OneOrderDetailAdmin from '../Components/OneOrderDetailAdmin/OneOrderDetailAdmin';
import { useParams } from 'react-router-dom';

const OrderDetailsAdmin = () => {
    const { orderId } = useParams();
    console.log(orderId);
    console.log("helloooooooooooooooooooooooooooo we got the product id", {orderId});
    return (
        <div>
            <Sidebar/>
            <OneOrderDetailAdmin orderId={orderId} />

        </div>
    );
};

export default OrderDetailsAdmin;
