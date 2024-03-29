// PieChart.jsx

import React from 'react';
import { Pie } from 'react-chartjs-2';
import './PieChart.css';

const PieChart = () => {
  const data = {
    labels: ['Hybrid fruit', 'Hybrid flower', 'Bonsai', 'Cactus'],
    datasets: [
      {
        data: [5, 13, 9, 7],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50'],
      },
    ],
    title:"Plants By Category",
  };

  return (
    <div className="pie-chart-container">
      {/* <h2>Plant Categories Distribution</h2> */}
      {/* <h2 className="hisoh2">User Numbers Over Last 4 Years</h2> */}
    
      <Pie data={data} />
    </div>
  );
};

export default PieChart;
