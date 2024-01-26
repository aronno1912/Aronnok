// Table.jsx

import React from 'react';
import './Table.css';
import { Link } from 'react-router-dom';

const Table = ({ data }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            
            <th>Order Id</th>
            <th>Date</th>
            <th>Payment Method</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              
              <td>

              <Link to={`/admin/orderlist/order-details/${item._id}`} className='container-link' style={{ textDecoration: 'none', color:'black'}}>

              {item._id}
              </Link>
              </td>
              <td>{item.placedOn}</td>
              <td>{item.paidBy}</td>
              <td>{item.user}</td>
              <td>{item.status}</td>
              <td>{item.amount}$</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
