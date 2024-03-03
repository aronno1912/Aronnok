// Histogram.jsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import './Histrogram.css';

const Histogram = () => {
  const data = {
    labels: ['2021', '2022', '2023', '2024'],
    datasets: [
      {
        label: 'User Numbers',
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.6)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: [3, 4, 4, 6],
      },
    ],
  };

  return (
    <div className="histogram-container">
      <h2 className="hisoh2">User Numbers Over Last 4 Years</h2>
      <Bar data={data} />
    </div>
  );
};

export default Histogram;
