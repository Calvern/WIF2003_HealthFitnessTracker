import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const CardioLineChart = ({ mode }) => {
  const labels = mode === 'daily'
    ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    : ['Apr 1–7', 'Apr 8–14', 'Apr 15–21', 'Apr 22–28'];

  const data = {
    labels,
    datasets: [
      {
        data: mode === 'daily' ? [30, 45, 35, 50, 40, 60, 25] : [200, 150, 180, 170],
        borderColor: '#507DBC',
        backgroundColor: '#507DBC',
        tension: 0,
        fill: false,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true, 
        title: {
          display: true,           
          text: 'Total Minutes',         
          position: 'top',         
          font: {
            size: 16,              
            weight: 'bold',        
          },
          padding: {
            top: 10,               
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default CardioLineChart;

