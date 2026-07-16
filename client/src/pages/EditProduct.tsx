import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

import { getCategories } from "../services/categoryService";
import { getSuppliers } from "../services/supplierService";
import { getProductById, updateProduct } from "../services/productService";

interface Category {
  id: number;
  category_name: string;
}

interface Supplier {
  id: number;
  supplier_name: string;
}

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    product_name: "",
    category_id: "",
    supplier_id: "",
    price: "",
    quantity: "",
    minimum_stock: "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchSuppliers();
    fetchProduct();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getCategories()
      setCategories(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const res = await getSuppliers()
      setSuppliers(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await getProductById(Number(id))

      console.log("Product Response: ",response.data)
      
      const product = response.data.data

      console.log("Product Response",response)
      setFormData({
        product_name: product.product_name,
        category_id: String(product.category_id),
        supplier_id: String(product.supplier_id),
        price: String(product.price),
        quantity: String(product.quantity),
        minimum_stock: String(product.minimum_stock),
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const loadingToast = toast.loading("Updating product...");

  try {
    await updateProduct(Number(id), formData);

    toast.dismiss(loadingToast);
    toast.success("Product updated successfully");

    navigate("/products");
  } catch (error) {
    console.error(error);

    toast.dismiss(loadingToast);
    toast.error("Failed to update product");
  }
};

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center">
        <h2 className="text-2xl font-semibold text-blue-600">
          Loading...
        </h2>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Edit Product
          </h1>
          <p className="text-gray-500">
            Update product details
          </p>
        </div>

        <Link
          to="/products"
          className="rounded-lg bg-gray-600 px-4 py-2 text-white hover:bg-gray-700"
        >
          Back
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label className="mb-2 block font-medium">
            Product Name
          </label>

          <input
            type="text"
            name="product_name"
            value={formData.product_name}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Category
          </label>

          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.category_name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Supplier
          </label>

          <select
            name="supplier_id"
            value={formData.supplier_id}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">Select Supplier</option>

            {suppliers.map((supplier) => (
              <option
                key={supplier.id}
                value={supplier.id}
              >
                {supplier.supplier_name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div>
            <label className="mb-2 block font-medium">
              Price
            </label>

            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Quantity
            </label>

            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Minimum Stock
            </label>

            <input
              type="number"
              name="minimum_stock"
              value={formData.minimum_stock}
              onChange={handleChange}
              className="w-full rounded-lg border p-3"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;