import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ProtectedRoute from "../components/ProtectedRoute";

// Pages
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import EditProduct from "../pages/EditProduct";
import Categories from "../pages/Categories";
import Suppliers from "../pages/Suppliers";
import { AddSupplier } from "../pages/AddSupplier";
import EditSupplier from "../pages/EditSupplier";
import Stock from "../pages/Stock";
import StockTransaction from "../pages/StockTransaction";
import Users from "../pages/User";
import Reports from "../pages/Reports";
import Profile from "../pages/Profile";
import ChangePassword from "../pages/ChangePassword";
import ProductDetails from "../pages/ProductDetails";
import LowStock from "../pages/LowStock";

const AppRoutes = () => {
  return (
    <>
      {/* TOAST */}
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <Routes>

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/add"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/edit/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />

        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          }
        />

        <Route
          path="/suppliers"
          element={
            <ProtectedRoute>
              <Suppliers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/suppliers/add"
          element={
            <ProtectedRoute>
              <AddSupplier />
            </ProtectedRoute>
          }
        />

        <Route
          path="/suppliers/edit/:id"
          element={
            <ProtectedRoute>
              <EditSupplier />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stock"
          element={
            <ProtectedRoute>
              <Stock />
            </ProtectedRoute>
          }
        />

        <Route
          path="/stock-transaction"
          element={
            <ProtectedRoute>
              <StockTransaction />
            </ProtectedRoute>
          }
        />

        <Route
          path="/low-stock"
          element={
            <ProtectedRoute>
              <LowStock />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
};

export default AppRoutes;