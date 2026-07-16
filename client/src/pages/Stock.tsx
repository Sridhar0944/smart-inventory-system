import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";


interface Product {
  id: number;
  product_name: string;
  category_name?: string;
  supplier_name?: string;
  price: number;
  quantity: number;
  minimum_stock: number;
}


const Stock = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchStock();
  }, []);



  const fetchStock = async () => {

    try {

      const res = await getProducts();

      console.log(res);

      setProducts(res.data || []);

    } catch(error){

      console.error(error);
      alert("Failed to load products");

    } finally {

      setLoading(false);

    }

  };



  const filteredProducts = products.filter((product)=>
    product.product_name
      .toLowerCase()
      .includes(search.toLowerCase())
  );



  if(loading){

    return(
      <div className="
        flex
        h-64
        items-center
        justify-center
      ">

        <h2 className="
          text-xl
          font-semibold
          text-blue-600
        ">
          Loading Stock...
        </h2>

      </div>
    )

  }



  return (

    <div className="
      mx-auto
      w-full
      max-w-7xl
    ">


      {/* Header */}

      <div className="
        mb-6
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">


        <div>

          <h1 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-gray-800
          ">
            Stock Management
          </h1>


          <p className="
            mt-1
            text-gray-500
          ">
            Total Products : {products.length}
          </p>

        </div>



        <input

          type="text"

          placeholder="Search Product..."

          value={search}

          onChange={(e)=>setSearch(e.target.value)}

          className="
            w-full
            sm:w-72
            rounded-lg
            border
            p-3
            outline-none
            focus:ring-2
            focus:ring-blue-500
          "

        />


      </div>





      {/* Table Card */}


      <div className="
        rounded-xl
        bg-white
        p-3
        sm:p-6
        shadow-md
      ">


        {/* Desktop Table */}

<div className="hidden md:block rounded-xl bg-white p-4 shadow-md overflow-x-auto">

  <table className="w-full border-collapse">

    <thead className="bg-gray-100">
      <tr>
        <th className="border px-4 py-3 text-left">#</th>
        <th className="border px-4 py-3 text-left">Product</th>
        <th className="border px-4 py-3 text-left">Price</th>
        <th className="border px-4 py-3 text-left">Quantity</th>
        <th className="border px-4 py-3 text-left">Minimum</th>
        <th className="border px-4 py-3 text-left">Status</th>
      </tr>
    </thead>


    <tbody>
      {filteredProducts.map((product,index)=>(

        <tr key={product.id} className="hover:bg-gray-50">

          <td className="border px-4 py-3">
            {index+1}
          </td>

          <td className="border px-4 py-3">
            {product.product_name}
          </td>

          <td className="border px-4 py-3">
            ₹{product.price}
          </td>

          <td className="border px-4 py-3">
            {product.quantity}
          </td>

          <td className="border px-4 py-3">
            {product.minimum_stock}
          </td>

          <td className="border px-4 py-3">

            {product.quantity <= product.minimum_stock ?

            <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">
              Low Stock
            </span>

            :

            <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
              In Stock
            </span>

            }

          </td>

        </tr>

      ))}
    </tbody>

  </table>

</div>



{/* Mobile Cards */}

<div className="grid gap-4 md:hidden">

{
filteredProducts.map((product,index)=>(

<div
key={product.id}
className="rounded-xl bg-white p-5 shadow-md"
>

<div className="flex justify-between mb-3">

<h2 className="font-bold text-lg">
{product.product_name}
</h2>

<span className="text-gray-500">
#{index+1}
</span>

</div>


<div className="space-y-2 text-sm">

<p>
<strong>Price:</strong> ₹{product.price}
</p>

<p>
<strong>Quantity:</strong> {product.quantity}
</p>

<p>
<strong>Minimum Stock:</strong> {product.minimum_stock}
</p>


<p>
<strong>Status:</strong>

{" "}

{
product.quantity <= product.minimum_stock ?

<span className="rounded-full bg-red-100 px-3 py-1 text-red-600">
Low Stock
</span>

:

<span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
In Stock
</span>

}

</p>

</div>


</div>


))
}

</div>


      </div>



    </div>

  );

};


export default Stock;