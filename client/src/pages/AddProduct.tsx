import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { addProduct } from "../services/productService";
import { getCategories } from "../services/categoryService";
import { getSuppliers } from "../services/supplierService";
import toast from "react-hot-toast";


interface Category {
  id: number;
  category_name: string;
}


interface Supplier {
  id: number;
  supplier_name: string;
}


interface ProductForm {
  product_name: string;
  category_id: string;
  supplier_id: string;
  price: string;
  quantity: string;
  minimum_stock: string;
  product_code: string;
}



const AddProduct = () => {


  const [categories,setCategories] = useState<Category[]>([]);
  const [suppliers,setSuppliers] = useState<Supplier[]>([]);


  const [loading,setLoading] = useState(false);
  const [selectedImage , setSelectedImage ] = useState<File | null>(null)
  const [preview , setPreview] = useState("")


  const [formData,setFormData] = useState<ProductForm>({

    product_name:"",
    category_id:"",
    supplier_id:"",
    price:"",
    quantity:"",
    minimum_stock:"",
    product_code:""

  });



  useEffect(()=>{

    loadDropdownData();

  },[]);



  const loadDropdownData = async()=>{

    try{

      const category = await getCategories();
      const supplier = await getSuppliers();


      setCategories(category.data);
      setSuppliers(supplier.data);


    }catch(error){

      console.log(error);

    }

  };




  const handleChange = (
    e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  )=>{


    setFormData({

      ...formData,

      [e.target.name]:e.target.value

    });


  };

  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if(file)
    {
      setSelectedImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }



  const handleSubmit = async(
    e:React.FormEvent
  )=>{


    e.preventDefault();


    try{


      setLoading(true);



      const data = new FormData();

      data.append("product_name", formData.product_name);
      data.append("category_id", formData.category_id);
      data.append("supplier_id", formData.supplier_id);
      data.append("price", formData.price);
      data.append("quantity", formData.quantity);
      data.append("minimum_stock", formData.minimum_stock);
      data.append("product_code", formData.product_code);

      if (selectedImage) {
        data.append("image", selectedImage);
      }

      const response = await addProduct(data);
      console.log(response)



      toast.success("✅ Product Added Successfully");



      setFormData({

        product_name:"",
        category_id:"",
        supplier_id:"",
        price:"",
        quantity:"",
        minimum_stock:"",
        product_code:""
      });

      setSelectedImage(null)
      setPreview("")



    }catch(error){


      console.log(error);

      toast.error("❌ Failed to add product");


    }
    finally{

      setLoading(false);

    }


  };






return (

<div className="max-w-5xl mx-auto">


<div className="mb-8">

<h1 className="text-3xl font-bold text-gray-800">
Add Product
</h1>


<p className="text-gray-500 mt-2">
Create new inventory product with barcode and QR code
</p>


</div>





<div className="bg-white shadow-xl rounded-2xl p-8">


<form
onSubmit={handleSubmit}
className="grid grid-cols-1 md:grid-cols-2 gap-6"
>



{/* Product Name */}

<div className="md:col-span-2">

<label className="font-semibold">
Product Name
</label>


<input

name="product_name"

value={formData.product_name}

onChange={handleChange}

placeholder="Enter product name"

required

className="w-full mt-2 p-3 border rounded-xl"

/>


</div>





{/* Product Code */}

<div>

<label className="font-semibold">
Product Code
</label>


<input

name="product_code"

value={formData.product_code}

onChange={handleChange}

placeholder="Example PROD001"

className="w-full mt-2 p-3 border rounded-xl"

/>


</div>

{/* Product Image */}

<div className="md:col-span-2">
  <label className="font-semibold">
    Product Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleImageChange}
    className="w-full mt-2 p-3 border rounded-xl"
  />
  {preview && (
    <img
      src={preview}
      alt="Preview"
      className="mt-4 h-40 w-40 rounded-lg border object-cover"
    />
  )}
</div>



{/* Category */}

<div>

<label className="font-semibold">
Category
</label>


<select

name="category_id"

value={formData.category_id}

onChange={handleChange}

required

className="w-full mt-2 p-3 border rounded-xl"

>


<option value="">
Select Category
</option>



{
categories.map(category=>(

<option
key={category.id}
value={category.id}
>

{category.category_name}

</option>


))
}



</select>


</div>





{/* Supplier */}

<div>


<label className="font-semibold">
Supplier
</label>


<select

name="supplier_id"

value={formData.supplier_id}

onChange={handleChange}

required

className="w-full mt-2 p-3 border rounded-xl"

>


<option value="">
Select Supplier
</option>


{
suppliers.map(supplier=>(


<option
key={supplier.id}
value={supplier.id}
>

{supplier.supplier_name}

</option>


))
}


</select>


</div>






{/* Price */}

<div>

<label className="font-semibold">
Price
</label>


<input

type="number"

name="price"

value={formData.price}

onChange={handleChange}

placeholder="₹ Price"

required

className="w-full mt-2 p-3 border rounded-xl"

/>


</div>







{/* Quantity */}

<div>

<label className="font-semibold">
Quantity
</label>


<input

type="number"

name="quantity"

value={formData.quantity}

onChange={handleChange}

placeholder="Stock quantity"

className="w-full mt-2 p-3 border rounded-xl"

/>


</div>






{/* Minimum Stock */}

<div className="md:col-span-2">


<label className="font-semibold">
Minimum Stock Alert
</label>


<input

type="number"

name="minimum_stock"

value={formData.minimum_stock}

onChange={handleChange}

placeholder="Minimum stock level"

className="w-full mt-2 p-3 border rounded-xl"

/>


</div>







{/* Buttons */}


<div className="md:col-span-2 flex gap-4 mt-5">


<button

disabled={loading}

className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700"

>


{
loading 
?
"Adding..."
:
"Add Product"

}


</button>




<Link

to="/products"

className="flex-1 text-center border py-3 rounded-xl font-semibold"

>

Cancel

</Link>



</div>




</form>


</div>


</div>


);



};


export default AddProduct;