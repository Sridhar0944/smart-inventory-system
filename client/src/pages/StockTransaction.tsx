import { useEffect, useState } from "react";

import { getProducts } from "../services/productService";
import {
  stockIn,
  stockOut,
  getHistory,
} from "../services/stockService";


interface Product {
  id:number;
  product_name:string;
  quantity:number;
}


interface Transaction {

  id:number;
  product_name:string;
  type:"in" | "out";
  quantity:number;
  remarks:string;
  created_at:string;

}



const StockTransaction =()=>{


const [products,setProducts] = useState<Product[]>([]);

const [history,setHistory] = useState<Transaction[]>([]);


const [productId,setProductId] = useState("");

const [type,setType] = useState<"in"|"out">("in");

const [quantity,setQuantity] = useState("");

const [remarks,setRemarks] = useState("");


const [loading,setLoading] = useState(false);

const [pageLoading,setPageLoading] = useState(true);





useEffect(()=>{

loadData();

},[]);





const loadData = async()=>{

try{

await Promise.all([
fetchProducts(),
fetchHistory()
]);


}
catch(error){

console.log(error);

}
finally{

setPageLoading(false);

}

};







const fetchProducts = async()=>{


try{


const res = await getProducts();


setProducts(
res.data?.data || res.data || []
);


}
catch(error){

console.log(error);

setProducts([]);

}


};









const fetchHistory = async()=>{


try{


const res = await getHistory();



setHistory(
res.data?.data || res.data || []
);



}
catch(error){

console.log(error);

setHistory([]);

}



};









const handleSubmit = async()=>{


if(!productId || !quantity){

alert(
"Please select product and enter quantity"
);

return;

}




const payload={

product_id:Number(productId),

quantity:Number(quantity),

remarks

};





try{


setLoading(true);



if(type==="in"){

await stockIn(payload);

}

else{

await stockOut(payload);

}




alert(
"Stock transaction completed"
);




setProductId("");

setQuantity("");

setRemarks("");

setType("in");



loadData();



}
catch(error:any){


console.log(error);


alert(

error.response?.data?.message ||

"Transaction failed"

);


}
finally{


setLoading(false);


}



};







if(pageLoading){


return(

<div className="
min-h-[300px]
flex
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

);


}








return(


<div className="
w-full
px-3
sm:px-5
md:px-8
">





<h1 className="
text-2xl
md:text-3xl
font-bold
text-gray-800
mb-6
">

Stock Transaction

</h1>







{/* FORM */}


<div className="
bg-white
rounded-xl
shadow-md
p-4
md:p-6
mb-6
">


<div className="
grid
grid-cols-1
md:grid-cols-2
lg:grid-cols-4
gap-4
">






<select

value={productId}

onChange={(e)=>setProductId(e.target.value)}

className="
border
rounded-lg
p-3
outline-none
focus:ring-2
focus:ring-blue-500
"

>


<option value="">
Select Product
</option>


{

products.map(product=>(


<option

key={product.id}

value={product.id}

>

{product.product_name}

&nbsp;

(
Stock: {product.quantity}
)

</option>


))


}


</select>









<select

value={type}

onChange={(e)=>setType(e.target.value as "in"|"out")}

className="
border
rounded-lg
p-3
outline-none
focus:ring-2
focus:ring-blue-500
"

>


<option value="in">
Stock In
</option>


<option value="out">
Stock Out
</option>


</select>









<input

type="number"

min="1"

placeholder="Quantity"

value={quantity}

onChange={(e)=>setQuantity(e.target.value)}

className="
border
rounded-lg
p-3
outline-none
focus:ring-2
focus:ring-blue-500
"

/>









<input

type="text"

placeholder="Remarks"

value={remarks}

onChange={(e)=>setRemarks(e.target.value)}

className="
border
rounded-lg
p-3
outline-none
focus:ring-2
focus:ring-blue-500
"

/>



</div>







<button

onClick={handleSubmit}

disabled={loading}

className={`

mt-5

px-6

py-3

rounded-lg

text-white

font-semibold


${

loading

?

"bg-gray-400"

:

type==="in"

?

"bg-green-600 hover:bg-green-700"

:

"bg-red-600 hover:bg-red-700"

}

`}

>


{

loading

?

"Saving..."

:

"Save Transaction"

}


</button>




</div>










{/* HISTORY */}



<div className="
bg-white
rounded-xl
shadow-md
overflow-hidden
">


<div className="
overflow-x-auto
">


<table className="
w-full
text-sm
">


<thead className="
bg-gray-100
">


<tr>


<th className="p-3 text-left">
Product
</th>


<th className="p-3 text-left">
Type
</th>


<th className="p-3 text-left">
Quantity
</th>


<th className="p-3 text-left">
Remarks
</th>


<th className="p-3 text-left">
Date
</th>


</tr>


</thead>





<tbody>


{

history.length===0 ?


<tr>

<td

colSpan={5}

className="
text-center
p-6
text-gray-500
"

>

No transaction found

</td>

</tr>


:

history.map(item=>(


<tr

key={item.id}

className="
border-t
hover:bg-gray-50
"

>


<td className="p-3">

{item.product_name}

</td>





<td className="p-3">


<span

className={`

px-3

py-1

rounded-full

text-white

text-xs


${

item.type==="in"

?

"bg-green-600"

:

"bg-red-600"

}

`}

>


{item.type.toUpperCase()}


</span>


</td>






<td className="p-3">

{item.quantity}

</td>






<td className="p-3">

{item.remarks || "-"}

</td>






<td className="p-3 whitespace-nowrap">

{
new Date(item.created_at)
.toLocaleDateString()
}

</td>





</tr>



))


}



</tbody>



</table>


</div>


</div>






</div>


);


};


export default StockTransaction;