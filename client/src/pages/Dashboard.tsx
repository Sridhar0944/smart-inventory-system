import { useEffect, useState } from "react";
import {
  FaBoxOpen,
  FaTags,
  FaTruck,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";
import { getDashboardStats } from "../services/dashboardService";
import StockChart from "../components/StockChart";

interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  totalSuppliers: number;
  lowStock: number;
  outOfStock: number;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalCategories: 0,
    totalSuppliers: 0,
    lowStock: 0,
    outOfStock: 0,
  });

  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data || {
          totalProducts:0,
          totalCategories:0,
          totalSuppliers:0,
          lowStock:0,
          outOfStock:0
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <div className="animate-pulse text-2xl font-semibold text-blue-600">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Products",
      value: stats.totalProducts,
      icon: <FaBoxOpen className="text-3xl" />,
      color: "blue",
    },
    {
      title: "Categories",
      value: stats.totalCategories,
      icon: <FaTags className="text-3xl" />,
      color: "green",
    },
    {
      title: "Suppliers",
      value: stats.totalSuppliers,
      icon: <FaTruck className="text-3xl" />,
      color: "purple",
    },
    {
      title: "Low Stock",
      value: stats.lowStock,
      icon: <FaExclamationTriangle className="text-3xl" />,
      color: "yellow",
    },
    {
      title: "Out of Stock",
      value: stats.outOfStock,
      icon: <FaTimesCircle className="text-3xl" />,
      color: "red",
    },
  ];

  const inStock = Math.max(
  stats.totalProducts - stats.lowStock - stats.outOfStock,
  0
);

  return (
    <div className="space-y-8">

      {/* Welcome */}

      <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">

        <h1 className="text-2xl font-bold md:text-4xl">
          Welcome 👋
        </h1>

        <p className="mt-2 text-sm md:text-lg text-blue-100">
          Monitor your inventory, products and stock in one place.
        </p>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">

        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-white p-6 shadow transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-800">
                  {card.value}
                </h2>

              </div>

              <div
                className={`rounded-full p-4
                ${
                  card.color === "blue"
                    ? "bg-blue-100 text-blue-600"
                    : card.color === "green"
                    ? "bg-green-100 text-green-600"
                    : card.color === "purple"
                    ? "bg-purple-100 text-purple-600"
                    : card.color === "yellow"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {card.icon}
              </div>

            </div>
          </div>
        ))}

      </div>


      {/* Summary */}

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl bg-white p-6 shadow">

          <h2 className="mb-5 text-xl font-bold text-gray-800">
            Inventory Summary
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-2">
              <span>Total Products</span>
              <span className="font-bold">
                {stats.totalProducts}
              </span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span>Total Categories</span>
              <span className="font-bold">
                {stats.totalCategories}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Total Suppliers</span>
              <span className="font-bold">
                {stats.totalSuppliers}
              </span>
            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <h2 className="mb-5 text-xl font-bold text-gray-800">
            Stock Alerts
          </h2>

          <div className="space-y-4">

            <div className="flex items-center justify-between rounded-xl bg-yellow-50 p-4">

              <span className="font-medium text-yellow-700">
                Low Stock
              </span>

              <span className="rounded-full bg-yellow-500 px-4 py-1 font-bold text-white">
                {stats.lowStock}
              </span>

            </div>

            <div className="flex items-center justify-between rounded-xl bg-red-50 p-4">

              <span className="font-medium text-red-700">
                Out of Stock
              </span>

              <span className="rounded-full bg-red-600 px-4 py-1 font-bold text-white">
                {stats.outOfStock}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Stock Chart */}

      <StockChart
        inStock={inStock}
        lowStock={stats.lowStock}
        outStock={stats.outOfStock}
      />

    </div>
  );
};

export default Dashboard;