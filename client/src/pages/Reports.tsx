import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface Product {
  id: number;
  product_name: string;
  category_name: string;
  quantity: number;
  minimum_stock: number;
}

const Reports = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search,setSearch]=useState("")
  const [category,setCategory]=useState("All")

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
  setCurrentPage(1);
}, [search, category]);

  const fetchProducts = async () => {
  try {

    const res = await getProducts();

    console.log("Products:", res.data);

    setProducts(
      res.data.data || res.data || []
    );

  } catch(error){

    console.error(error);

    setProducts([]);

  }
};

  const lowStock = products.filter(
    (p) => p.quantity <= p.minimum_stock
  );

  const outOfStock = products.filter(
    (p) => p.quantity === 0
  );

  const categories = [
    "All",
    ...new Set(products.map((p)=>p.category_name))
  ]

  const filteredProducts = products.filter((item)=>{
    const matchesSearch = item.product_name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
  category === "All" || item.category_name === category;

    return matchesSearch && matchesCategory
  })

  const totalPages = Math.ceil(filteredProducts.length/itemsPerPage)

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirst,
    indexOfLast
  )

  const exportToExcel = () => {
    const data = filteredProducts.map((item) => ({
  Product: item.product_name,
  Category: item.category_name,
  Stock: item.quantity,
  Minimum_Stock: item.minimum_stock,
  Status:
    item.quantity === 0
      ? "Out of Stock"
      : item.quantity <= item.minimum_stock
      ? "Low Stock"
      : "In Stock",
}));

    const worksheet  = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Inventory Reports"
    )

    const excelBuffer = XLSX.write(workbook,
       { bookType:"xlsx",
        type:"array"
        }
    )

    const file = new Blob([excelBuffer],{
        type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    })

    saveAs(file,"Inventory_Reports.xlsx")
  }

  const exportToPdf = () => {
    const doc = new jsPDF()

    doc.setFontSize(18)
    doc.text("Smart Inventory Report",14,20)

    const rows = filteredProducts.map((item)=>[
        item.product_name,
        item.category_name,
        item.quantity,
        item.minimum_stock,
        item.quantity === 0 ?
        "Out of Stock" : item.quantity <= item.minimum_stock 
        ? "Low Stock" : "In Stock"
    ])

    autoTable(doc,{
        head:[[
            "Product",
            "Category",
            "Stock",
            "Minimum",
            "Status"
        ]],
        body: rows,
        startY: 30
    })

    doc.save("Inventory_Reports.pdf")
  }

  return (

<div
className="
w-full
min-h-screen
px-3
sm:px-5
lg:px-6
overflow-x-hidden
"
>


<h1
className="
text-2xl
md:text-3xl
font-bold
text-gray-800
mb-5
"
>
Reports
</h1>





{/* EXPORT BUTTONS */}

<div
className="
grid
grid-cols-1
sm:grid-cols-2
gap-3
mb-5
"
>


<button
onClick={exportToExcel}
className="
bg-green-600
hover:bg-green-700
text-white
font-medium
py-2.5
rounded-lg
shadow
transition
"
>
Export Excel
</button>


<button
onClick={exportToPdf}
className="
bg-red-600
hover:bg-red-700
text-white
font-medium
py-2.5
rounded-lg
shadow
transition
"
>
Export PDF
</button>


</div>







{/* SEARCH */}

<div
className="
grid
grid-cols-1
md:grid-cols-2
gap-3
mb-5
"
>


<input

type="text"

placeholder="Search product..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
w-full
border
rounded-lg
px-4
py-2.5
outline-none
focus:ring-2
focus:ring-blue-500
"

/>




<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

className="
w-full
border
rounded-lg
px-4
py-2.5
outline-none
"

>

{
categories.map(cat=>(

<option
key={cat}
value={cat}
>

{cat}

</option>

))
}

</select>



</div>







{/* CARDS */}

<div
className="
grid
grid-cols-1
sm:grid-cols-3
gap-4
mb-6
"
>


<div
className="
bg-blue-600
text-white
rounded-xl
p-5
shadow-md
"
>

<p className="text-sm">
Total Products
</p>

<h2
className="
text-3xl
font-bold
mt-2
"
>
{products.length}
</h2>

</div>





<div
className="
bg-yellow-500
text-white
rounded-xl
p-5
shadow-md
"
>

<p className="text-sm">
Low Stock
</p>

<h2
className="
text-3xl
font-bold
mt-2
"
>
{lowStock.length}
</h2>

</div>





<div
className="
bg-red-600
text-white
rounded-xl
p-5
shadow-md
"
>

<p className="text-sm">
Out Of Stock
</p>

<h2
className="
text-3xl
font-bold
mt-2
"
>
{outOfStock.length}
</h2>

</div>



</div>








{/* TABLE */}

<div
className="
bg-white
rounded-xl
shadow-md
overflow-hidden
"
>


<div
className="
overflow-x-auto
"
>


<table
className="
w-full
text-sm
"
>


<thead
className="
bg-gray-100
"
>

<tr>


<th className="px-4 py-3 text-left">
Product
</th>


<th className="px-4 py-3 text-left">
Category
</th>


<th className="px-4 py-3 text-left">
Stock
</th>


<th className="px-4 py-3 text-left">
Minimum
</th>


<th className="px-4 py-3 text-left">
Status
</th>


</tr>

</thead>





<tbody>


{
currentProducts.length===0 ?


<tr>

<td
colSpan={5}
className="
text-center
py-8
text-gray-500
"
>

No products found

</td>

</tr>


:

currentProducts.map(item=>(


<tr
key={item.id}
className="
border-t
hover:bg-gray-50
"
>


<td
className="
px-4
py-3
font-medium
whitespace-nowrap
"
>

{item.product_name}

</td>




<td
className="
px-4
py-3
whitespace-nowrap
"
>

{item.category_name}

</td>




<td className="px-4 py-3">
{item.quantity}
</td>



<td className="px-4 py-3">
{item.minimum_stock}
</td>




<td className="px-4 py-3">


{
item.quantity===0 ?


<span
className="
bg-red-600
text-white
px-3
py-1
rounded-full
text-xs
"
>
Out of Stock
</span>


:

item.quantity <= item.minimum_stock ?


<span
className="
bg-yellow-500
text-white
px-3
py-1
rounded-full
text-xs
"
>
Low Stock
</span>


:


<span
className="
bg-green-600
text-white
px-3
py-1
rounded-full
text-xs
"
>
In Stock
</span>

}



</td>


</tr>


))

}



</tbody>


</table>


</div>


</div>








{/* PAGINATION */}

<div
className="
flex
items-center
justify-between
mt-5
gap-3
"
>


<button

onClick={()=>
setCurrentPage(
prev=>Math.max(prev-1,1)
)
}

disabled={currentPage===1}

className="
bg-gray-700
text-white
px-4
py-2
rounded-lg
disabled:opacity-40
"

>
Previous
</button>




<span
className="
text-sm
font-semibold
"
>

Page {currentPage} / {totalPages || 1}

</span>
<button

onClick={()=>
setCurrentPage(
prev=>Math.min(prev+1,totalPages)
)
}

disabled={
currentPage===totalPages ||
totalPages===0
}

className="
bg-gray-700
text-white
px-4
py-2
rounded-lg
disabled:opacity-40
"

>
Next
</button>

</div>
</div>
);
};

export default Reports;