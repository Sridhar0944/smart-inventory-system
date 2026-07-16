import { useEffect, useState } from "react";
import { getLowStockProducts } from "../services/lowStockService";

interface Product{
    id:number,
    product_name:string,
    category_name:string,
    supplier_name:string,
    quantity:number,
    minimum_stock:number
}

const LowStock = () => {
    const [products , setProducts ] = useState<Product[]>([])
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        fetchLowStockProduct()
    },[])

    const fetchLowStockProduct = async () => {
        try{
            const response = await getLowStockProducts()
            console.log("Low Stock Response: ",response)

            setProducts(response.data)
        }catch(error){
            console.error("Error fetching low stock products: ",error);
        }finally{
            setLoading(false)
        }
    }

    if(loading)
    {
        return(
            <div className="flex h-[60vh] items-center justify-center">
                <h2 className="text-2xl font-semibold text-blue-600">
                    Loading...
                </h2>
            </div>
        )
    }

    return(
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-red-600">
                    Low Stock Products
                </h1>
                <p className="text-gray-500 mt-2">
                    Product that have reached the minimum stock level
                </p>
            </div>

            <div className="hidden overflow-x-auto rounded-xl bg-white shadow md:block">
                <table className="min-w-full">
                    <thead className="bg-red-600 text-white">
                        <tr>
                            <th className="px-5 py-3 text-left">id</th>
                            <th className="px-5 py-3 text-left">Product</th>
                            <th className="px-5 py-3 text-left">Category</th>
                            <th className="px-5 py-3 text-left">Supplier</th>
                            <th className="px-5 py-3 text-left">Current</th>
                            <th className="px-5 py-3 text-left">Minimum</th>
                            <th className="px-5 py-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="py-8 text-center text-gray-500"
                                >
                                    No low stock products found
                                </td>
                            </tr>
                        ) : (
                            products.map((product,index)=>(
                                <tr 
                                    key={product.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="px-5 py-4">{index + 1 }</td>
                                    <td className="px-5 py-4 font-semibold">
                                        {product.product_name}
                                    </td>
                                    <td className="px-5 py-4">
                                        {product.category_name}
                                    </td>
                                    <td className="px-5 py-4">
                                        {product.supplier_name}
                                    </td>
                                    <td className="px-5 py-4">
                                        {product.quantity}
                                    </td>
                                    <td className="px-5 py-4">
                                        {product.minimum_stock}
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                                            Low Stock
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile cards */}

            <div className="space-y-4 md:hidden">
                {products.length === 0 ? (
                    <div className="rounded-xl bg-white p-6 text-center shadow">
                        <p className="text-gray-500">
                            No Low Stock products found
                        </p>
                    </div>
                ): (
                    products.map((product)=>(
                        <div key={product.id}
                        className="rounded-xl bg-white p-5 shadow"
                        >
                            <div className="flex items-center justify-between">
                                <h2 className="text-lg font-bold">
                                    {product.product_name}
                                </h2>
                                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                                    Low Stock 
                                </span>
                            </div>

                            <div className="mt-4 space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-500">
                                        Category
                                    </span>
                                    <span>{product.category_name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-500">
                                        Supplier
                                    </span>
                                    <span>{product.supplier_name}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-500">
                                        Current Stock
                                    </span>
                                    <span>{product.quantity}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-500">
                                        Minimum Stock
                                    </span>
                                    <span>{product.minimum_stock}</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default LowStock