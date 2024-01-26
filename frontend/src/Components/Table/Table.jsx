// Table.jsx

import React from 'react';
import './Table.css';

const Table = ({ data }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Order Id</th>
            <th>Date</th>
            <th>Payment Method</th>
            <th>Customer Name</th>
            <th>Status</th>
            <th>Amount</th>
          </tr>
        </thead>
        {/* <tbody>
          {data.map((item) => (
            <tr key={item.orderId}>
              <td>{item.product}</td>
              <td>{item.orderId}</td>
              <td>{item.date}</td>
              <td>{item.paymentMethod}</td>
              <td>{item.customerName}</td>
              <td>{item.status}</td>
              <td>{item.amount}</td>
            </tr>
          ))}
        </tbody> */}
      </table>
    </div>
  );
};

export default Table;
