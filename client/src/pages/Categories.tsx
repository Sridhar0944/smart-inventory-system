import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  id: number;
  category_name: string;
  description: string;
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null)
  const [search , setSearch] = useState("")

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/categories");

    console.log("Response =", res.data);
    console.log("Categories =", res.data.data);

    setCategories(res.data.data);

    console.log("State Updated");
  } catch (error) {
    console.error("Axios Error:", error);
    alert("Failed to load categories");
  }
};

  const addCategory = async () => {
    if (!categoryName.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      if(editingId === null)
        {
            await axios.post("http://localhost:5000/api/categories", {
            category_name: categoryName,
            description,
            });
            alert("Category added successfully");
        }
    else{
        await axios.put(`http://localhost:5000/api/categories/${editingId}`,{
            category_name: categoryName,
            description
        })
        alert("Category updated successfully")
    }

    setCategoryName("");
    setDescription("");
    setEditingId(null)

    fetchCategories();
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    }
  };

  const handleEdit = (category: Category) => {
    setCategoryName(category.category_name)
    setDescription(category.description || "")
    setEditingId(category.id)
  }

  const handleDelete = async (id:number) =>{
    const confirmData = window.confirm("Are you sure want to delete this category?")

    if(!confirmData) return

    try{
        await axios.delete(`http://localhost:5000/api/categories/${id}`)
        alert("Category delete succussfully")
        fetchCategories()
    }catch(err){
        console.error(err)
        alert("Failed to delete category")
    }
  }

  //====Filtered =======

  const filteredCategories = categories.filter((category)=>
    category.category_name.toLowerCase().includes(search.toLowerCase())
)

  return (
  <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-8">

    <h1 className="mb-6 text-2xl sm:text-3xl font-bold text-gray-800">
      Categories
    </h1>


    {/* Add Category Card */}

    <div className="rounded-xl bg-white p-4 sm:p-6 shadow-md">

      <h2 className="mb-5 text-lg sm:text-xl font-semibold">
        {editingId === null ? "Add Category" : "Update Category"}
      </h2>


      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">


        <div>
          <label className="mb-2 block font-medium">
            Category Name
          </label>

          <input
            type="text"
            value={categoryName}
            onChange={(e)=>setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="
            w-full rounded-lg border p-3
            outline-none
            focus:ring-2 focus:ring-blue-500
            "
          />

        </div>



        <div>

          <label className="mb-2 block font-medium">
            Description
          </label>


          <input
            type="text"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            placeholder="Enter description"
            className="
            w-full rounded-lg border p-3
            outline-none
            focus:ring-2 focus:ring-blue-500
            "
          />

        </div>


      </div>



      <button
        onClick={addCategory}
        className="
        mt-5 w-full sm:w-auto
        rounded-lg 
        bg-blue-600 
        px-6 py-3
        font-semibold
        text-white
        hover:bg-blue-700
        "
      >

        {editingId === null ? "Add Category" : "Update Category"}

      </button>


    </div>



    {/* Search */}


    <div className="my-6 flex justify-center sm:justify-end">

      <input
        type="text"
        placeholder="Search Category..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="
        w-full 
        sm:max-w-sm
        rounded-lg
        border
        p-3
        outline-none
        focus:ring-2 focus:ring-blue-500
        "
      />

    </div>




    {/* Category Table */}


    <div className="
    rounded-xl 
    bg-white 
    p-4 sm:p-6 
    shadow-md
    ">


      <h2 className="mb-5 text-lg sm:text-xl font-semibold">
        Category List
      </h2>



      <div className="overflow-x-auto">


        <table className="
        min-w-full
        border-collapse
        text-sm sm:text-base
        ">


          <thead className="bg-gray-100">


            <tr>


              <th className="border px-3 py-3 text-left">
                #
              </th>


              <th className="border px-3 py-3 text-left">
                Category
              </th>


              <th className="border px-3 py-3 text-left">
                Description
              </th>


              <th className="border px-3 py-3 text-center">
                Actions
              </th>


            </tr>


          </thead>




          <tbody>


          {
          filteredCategories.length === 0 ? (

            <tr>

              <td
              colSpan={4}
              className="
              border
              px-4 py-6
              text-center
              text-gray-500
              "
              >

                No categories found.

              </td>


            </tr>


          ) : (


          filteredCategories.map((category,index)=>(


            <tr
            key={category.id}
            className="hover:bg-gray-50"
            >



              <td className="border px-3 py-3">
                {index+1}
              </td>



              <td className="
              border 
              px-3 py-3
              font-medium
              whitespace-nowrap
              ">

                {category.category_name}

              </td>



              <td className="
              border 
              px-3 py-3
              ">

                {category.description || "-"}

              </td>




              <td className="border px-3 py-3">


                <div className="
                flex
                flex-col
                gap-2
                sm:flex-row
                sm:justify-center
                ">


                  <button

                  onClick={()=>handleEdit(category)}

                  className="
                  rounded
                  bg-yellow-500
                  px-3 py-2
                  text-white
                  hover:bg-yellow-600
                  "

                  >

                    Edit

                  </button>



                  <button

                  onClick={()=>handleDelete(category.id)}

                  className="
                  rounded
                  bg-red-600
                  px-3 py-2
                  text-white
                  hover:bg-red-700
                  "

                  >

                    Delete

                  </button>


                </div>


              </td>



            </tr>


          ))

          )

          }


          </tbody>


        </table>


      </div>


    </div>


  </div>
);
};

export default Categories;