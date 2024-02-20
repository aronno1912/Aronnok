import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './LineChart.css'

const LineChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Example data
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'june', 'july', 'august'],
      datasets: [
        {
          label: 'Sale graph',
          data: [10, 16, 3, 5, 2, 4, 8, 7],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgb(11, 23, 133)',
          borderWidth: 1,
        },
      ],
    };

    // Example options
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Create the chart
    const myChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: options,
    });

    return () => {
      // Cleanup on component unmount
      myChart.destroy();
    };
  }, []);

  return (
    <div className='graphstyles'>
      <canvas ref={chartRef} width="400" height="200"></canvas>
    </div>
  );
};

export default LineChart;
