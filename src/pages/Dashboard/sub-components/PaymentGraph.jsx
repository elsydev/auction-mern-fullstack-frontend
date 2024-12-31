import React from 'react'
import {Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement} from "chart.js";
  import {Bar} from "react-chartjs-2";
  import { useSuper } from '@/context/SuperContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
)

const PaymentGraph = () => {
  const {getMonthlyRevenue,
    monthlyRevenue,}=useSuper()
    const data = {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Total Payment Received",
          data: monthlyRevenue,
          backgroundColor: "#D6482B",
        },
      ],
    };
  
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          max: 5000,
          ticks: {
            callback: function (value) {
              return value.toLocaleString();
            },
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Monthly Total Payments Received",
        },
      },
    };
  
  return (
    <Bar data={data} options={options} />
  )
}

export default PaymentGraph
