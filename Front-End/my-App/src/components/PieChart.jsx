// PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Legend, Tooltip);

const PieChart = ({ data }) => {
  return (
    <div>
      <Pie
        data={data}
        options={{
          maintainAspectRatio: false,
          scales: {
            responsive: true,
            maintainAspectRatio: false,
          },
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        }}
      />
    </div>
  );
};

export default PieChart;
