import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  inStock: number;
  lowStock: number;
  outStock: number;
}

const StockChart = ({
  inStock,
  lowStock,
  outStock,
}: Props) => {
  const data = {
  labels: ["In Stock", "Low Stock", "Out of Stock"],
  datasets: [
    {
      label: "Products",
      data: [inStock, lowStock, outStock],
      backgroundColor: [
        "#22c55e", // Green
        "#facc15", // Yellow
        "#ef4444", // Red
      ],
      borderRadius: 8,
      borderWidth: 0,
    },
  ],
};

  const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: "Inventory Status",
      font: {
        size: 18,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
      },
    },
  },
};

  return (
    <div className="bg-white rounded-xl shadow p-6 h-96">
      <Bar data={data} options={options} />
    </div>
  );
};

export default StockChart;