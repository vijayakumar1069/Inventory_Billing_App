import React from "react";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
Chartjs.register(
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
  BarElement
);

const options = {
  responsive: true,
  Plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sales Vs Expesnives",
    },
  },
};
const data = {
  labels: ["jan", "feb", "mar"],
  datasets: [
    {
      label: "sales",
      data: [10, 20, 30],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "expensives",
      data: [5, 10, 60],
      backgroundColor: "rgba(65, 162, 232, 0.5)",
    },
  ],
};

export default function BarChart() {
  return <Bar options={options} data={data} />;
}
