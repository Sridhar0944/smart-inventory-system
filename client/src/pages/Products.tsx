import { useEffect, useState } from "react";
import { getProducts, deleteProduct } from "../services/productService";
import { Link } from "react-router-dom";
import {
  FaBoxOpen,
  FaRupeeSign,
  FaBoxes,
  FaExclamationTriangle,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import toast from "react-hot-toast";


interface Product {
  id: number;
  product_name: string;
  category_name: string;
  supplier_name: string;
  price: number | string;
  quantity: number;
  minimum_stock: number;
  image?: string;
  barcode?: string;
  qr_code?: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [ search , setSearch ] = useState("")
  const [ categoryFilter , setCategoryFilter ] = useState("All")
  const [ currentPage , setCurrentPage ] = useState(1)

  const productsPage = 10

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;
    const loadingToast = toast.loading("Delete Product...")

    try {
      await deleteProduct(id)

      toast.dismiss(loadingToast)
      toast.success("Product Deleted Successfully")

      fetchProducts();
    } catch (err) {
      console.error(err);

      toast.dismiss(loadingToast)
      toast.error("Failed to delete product")
    }
  };

  if (loading) {
    return (
      <div className="flex h-72 items-center justify-center">
        <h2 className="animate-pulse text-2xl font-semibold text-blue-600">
          Loading Products...
        </h2>
      </div>
    );
  }

  const categories = [
  "All",
  ...new Set(products.map((product) => product.category_name)),
];

const filteredProducts = products.filter((product) => {
  const matchSearch = product.product_name
    .toLowerCase()
    .includes(search.toLowerCase());

  const matchCategory =
    categoryFilter === "All" ||
    product.category_name === categoryFilter;

  return matchSearch && matchCategory;
});


  const indexOfLastProduct = currentPage * productsPage
  const indexOfFirstProduct = indexOfLastProduct - productsPage

  const currentProducts = filteredProducts.slice(indexOfFirstProduct,indexOfLastProduct)
  const totalPages = Math.ceil(filteredProducts.length / productsPage)
  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-3xl font-bold text-gray-800">
            Products
          </h1>

          <p className="text-gray-500">
            Manage all inventory products
          </p>

        </div>

        <Link
          to="/products/add"
          className="rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
        >
          + Add Product
        </Link>

      </div>

      {products.length === 0 ? (

        <div className="flex h-72 items-center justify-center">
          <h2 className="text-xl font-semibold text-gray-500">
            No products found.
          </h2>
        </div>

      ) : (

        <>

        <div className="flex flex-col gap-4 md:flex-row">
  <input
    type="text"
    placeholder="Search Product..."
    value={search}
    onChange={(e) => {setSearch(e.target.value); setCurrentPage(1)}}
    
    className="w-full rounded-lg border p-3 md:w-80"
  />

  <select
    value={categoryFilter}
    onChange={(e) => {setCategoryFilter(e.target.value),setCurrentPage(1)}}
    className="rounded-lg border p-3 md:w-60"
  >
    {categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
  </select>
</div>

          {/* Desktop Table */}

          <div className="hidden overflow-x-auto rounded-2xl bg-white shadow-lg lg:block">

            <table className="min-w-full table-auto">

              <thead className="bg-gray-100">

                <tr>

                  <th className="px-6 py-4 text-left">ID</th>
                  <th className="px-6 py-4 text-left">Image</th>

                  <th className="px-6 py-4 text-left">
                    Product
                  </th>

                  <th className="px-6 py-4 text-left">
                    Category
                  </th>

                  <th className="px-6 py-4 text-left">
                    Supplier
                  </th>

                  <th className="px-6 py-4 text-left">
                    Price
                  </th>

                  <th className="px-6 py-4 text-left">
                    Quantity
                  </th>

                  <th className="px-6 py-4 text-left">
                    Minimum Stock
                  </th>

                  <th className="px-6 py-4 text-left">
                    Barcode
                  </th>

                  <th className="px-6 py-4 text-left">
                    QR Code
                  </th>

                  <th className="px-6 py-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {currentProducts.map((product) => (

                  <tr
                    key={product.id}
                    className="border-b transition hover:bg-gray-50"
                  >

                    <td className="px-6 py-4">
                      {product.id}
                    </td>

                    <td className="px-6 py-4">
                      {product.image ? (
                        <img
                          src={`http://localhost:5000/uploads/products/${product.image}`}
                          alt={product.product_name}
                          className="h-14 w-14 rounded-lg border object-cover"
                        />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-lg border bg-gray-100 text-xs text-gray-400">
                          No Image
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {product.product_name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {product.category_name}
                    </td>

                    <td className="px-6 py-4 text-gray-600">
                      {product.supplier_name}
                    </td>

                    <td className="px-6 py-4">
                      ₹ {Number(product.price).toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          product.quantity <= product.minimum_stock
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {product.quantity}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                        {product.minimum_stock}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded bg-gray-100 px-3 py-1 text-sm font-mono">
                        {product.barcode}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {product.qr_code && (
                        <img
                          src={`http://localhost:5000/uploads/qrcodes/${product.qr_code}`}
                          alt="QR Code"
                          className="h-16 w-16"
                        />
                      )}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2">

                          <Link
                          to={`/products/${product.id}`}
                          className="
                          rounded-lg
                          bg-green-500
                          p-2
                          text-white
                          hover:bg-green-600
                          "
                          >

                          <FaEye />

                          </Link>


                          <Link
                          to={`/products/edit/${product.id}`}
                          className="
                          rounded-lg
                          bg-blue-500
                          p-2
                          text-white
                          hover:bg-blue-600
                          "
                          >

                          <FaEdit />

                          </Link>


                          <button
                          onClick={() => handleDelete(product.id)}
                          className="
                          rounded-lg
                          bg-red-500
                          p-2
                          text-white
                          hover:bg-red-600
                          "
                          >

                          <FaTrash />

                          </button>


                          </div>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

          {/* Mobile & Tablet Cards */}

          <div className="grid gap-5 lg:hidden">

            {currentProducts.map((product) => (

              <div
                key={product.id}
                className="rounded-2xl bg-white p-5 shadow-lg"
              >

                <div className="mb-5 flex items-center justify-between">

                  <div>

                    <h2 className="text-xl font-bold text-gray-800">
                      {product.product_name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Product ID : {product.id}
                    </p>

                    <p className="mt-2 text-sm text-gray-600">
                      <span className="font-semibold text-gray-800">Category:</span>{" "}
                      {product.category_name}
                    </p>

                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-800">Supplier:</span>{" "}
                      {product.supplier_name}
                    </p>

                  </div>

                  {product.image ? (
                    <img
                      src={`http://localhost:5000/uploads/products/${product.image}`}
                      alt={product.product_name}
                      className="h-20 w-20 rounded-xl border object-cover"
                    />
                  ) : (
                    <FaBoxOpen
                      size={45}
                      className="text-blue-600"
                    />
                  )}

                </div>

                <div className="grid grid-cols-2 gap-4">

                  <div className="rounded-xl bg-blue-50 p-3">

                    <div className="mb-2 flex items-center gap-2 text-blue-700">

                      <FaRupeeSign />

                      <span className="text-sm">
                        Price
                      </span>

                    </div>

                      <p className="text-lg font-bold">
                      ₹ {Number(product.price).toLocaleString("en-IN")}
                    </p>

                  </div>

                  <div className="rounded-xl bg-green-50 p-3">

                    <div className="mb-2 flex items-center gap-2 text-green-700">

                      <FaBoxes />

                      <span className="text-sm">
                        Quantity
                      </span>

                    </div>

                    <p
                      className={`text-lg font-bold ${
                        product.quantity <= product.minimum_stock
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {product.quantity}
                    </p>

                  </div>

                  <div className="col-span-2 rounded-xl bg-yellow-50 p-3">

                    <div className="mb-2 flex items-center gap-2 text-yellow-700">

                      <FaExclamationTriangle />

                      <span className="text-sm">
                        Minimum Stock
                      </span>

                    </div>

                    <p className="text-lg font-bold text-yellow-700">
                      {product.minimum_stock}
                    </p>


                    <p className="text-xs text-gray-500">
                      Alert Level
                    </p>

                  </div>

                  <div className="mt-4 rounded-xl border p-4">
                      <p className="font-semibold text-gray-700">
                        Barcode
                      </p>
                      <p className="mt-2 rounded bg-gray-100 px-3 py-2 font-mono text-sm">
                        {product.barcode}
                      </p>

                      <div className="mt-4">
                        <p className="mb-2 font-semibold text-gray-700">
                          QR Code
                        </p>
                        {product.qr_code && (
                          <img
                            src={`http://localhost:5000/uploads/qrcodes/${product.qr_code}`}
                            alt="QR-Code"
                            className="h-24 w-24 rounded border"
                          />
                        )}
                      </div>
                  </div>

                </div>

                {/* Actions row moved outside the grid so it spans the full card width */}
                <div className="mt-5 flex gap-3">

                  <Link
                    to={`/products/${product.id}`}
                    className="
                    flex-1
                    rounded-lg
                    bg-green-600
                    py-2
                    text-center
                    text-white
                    hover:bg-green-700
                    "
                    >

                    <FaEye className="inline mr-2"/>

                    View

                    </Link>
                    
                  <Link
                    to={`/products/edit/${product.id}`}
                    className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-white hover:bg-blue-700"
                  >
                    <FaEdit className="inline mr-2" />
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 rounded-lg bg-red-600 py-2 text-white hover:bg-red-700"
                  >
                    <FaTrash className="inline mr-2" />
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        </>

      )}
      {totalPages >1 &&(<div className="mt-6 flex justify-center gap-2">
  <button
    disabled={currentPage === 1}
    onClick={() => setCurrentPage(currentPage - 1)}
    className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
  >
    Previous
  </button>

  {[...Array(totalPages)].map((_, index) => (
    <button
      key={index}
      onClick={() => setCurrentPage(index + 1)}
      className={`rounded px-4 py-2 ${
        currentPage === index + 1
          ? "bg-blue-600 text-white"
          : "bg-gray-200"
      }`}
    >
      {index + 1}
    </button>
  ))}

  <button
    disabled={currentPage === totalPages}
    onClick={() => setCurrentPage(currentPage + 1)}
    className="rounded bg-gray-200 px-4 py-2 disabled:opacity-50"
  >
    Next
  </button>
</div>)}
      

    </div>
  );
};

export default Products;
