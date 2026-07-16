import { useState } from "react";
import type { ReactNode } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaBoxOpen,
  FaExchangeAlt,
  FaTags,
  FaTachometerAlt,
  FaTimes,
  FaTruck,
  FaUserCircle,
  FaUsers,
  FaWarehouse,
  FaChartBar,
  FaKey,
  FaSignOutAlt,
  FaExclamationTriangle
} from "react-icons/fa";

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const closeSidebar = () => setSidebarOpen(false);

  const menuClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
      isActive
        ? "bg-blue-600 text-white shadow-lg"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  const pageTitles: Record<string, string> = {
    "/": "Dashboard",
    "/products": "Products",
    "/categories": "Categories",
    "/suppliers": "Suppliers",
    "/stock": "Stock",
    "/stock-in": "Stock In",
    "/stock-transaction":"Stock Transactions",
    "/users": "Users",
    "/reports": "Reports",
    "/profile":"Profile",
    "/change-password":"Change Password",
    "/low-stock":"Low Stock"
  };

  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    navigate("/login")
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 min-h-screen w-72 bg-gray-900 text-white
        transform transition-transform duration-300
        lg:static lg:translate-x-0
        ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-gray-800 p-6">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">
              Smart Inventory
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Inventory Management
            </p>
          </div>

          <button
            onClick={closeSidebar}
            className="lg:hidden"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* User */}
        <div className="flex items-center gap-4 border-b border-gray-800 p-6">
          <FaUserCircle
            size={50}
            className="text-blue-400"
          />

          <div>
            <h2 className="font-semibold">Admin</h2>
            <p className="text-sm text-gray-400">
              Administrator
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-5">
          <NavLink
            to="/"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaTachometerAlt />
            Dashboard
          </NavLink>

          <NavLink
            to="/products"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaBoxOpen />
            Products
          </NavLink>

          <NavLink
            to="/categories"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaTags />
            Categories
          </NavLink>

          <NavLink
            to="/suppliers"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaTruck />
            Suppliers
          </NavLink>

          <NavLink
            to="/users"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaUsers />
            Users
          </NavLink>

          <NavLink
            to="/change-password"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaKey />
            Change Password
          </NavLink>

          <NavLink
            to="/profile"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaUserCircle />
            Profile
          </NavLink>

          <NavLink
            to="/stock"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaWarehouse />
            Stock
          </NavLink>

          <NavLink
            to="/stock-transaction"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaExchangeAlt />
            Stock Transactions
          </NavLink>

          <NavLink
            to="/low-stock"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaExclamationTriangle/>
            Low Stock
          </NavLink>
          <NavLink
            to="/reports"
            className={menuClass}
            onClick={closeSidebar}
          >
            <FaChartBar />
            Reports
          </NavLink>

        </nav>

        <div className="border-t border-gray-800 p-5">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-600 hover:text-white"
        >
          <FaSignOutAlt />
          Logout
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          © 2026 Smart Inventory
        </p>
      </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex items-center justify-between bg-white px-4 py-4 shadow-sm md:px-8">
          <div className="flex items-center gap-4">
            <button
              className="text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <FaBars size={24} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 md:text-3xl">
              {pageTitles[location.pathname] || "Smart Inventory"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <FaUserCircle
              size={38}
              className="text-gray-600"
            />

            <div className="hidden sm:block">
              <p className="font-semibold">Admin</p>
              <p className="text-sm text-gray-500">
                Welcome Back 👋
              </p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;