import { useState , useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaEdit , FaTrash } from 'react-icons/fa';

interface Supplier{
    id:number,
    supplier_name:string,
    contact_person:string,
    phone:string,
    email:string,
    address:string
}

const Suppliers = () => {
    const [ suppliers ,setSuppliers ] = useState<Supplier[]>([])
    const [ loading , setLoading ] = useState(true)

    const fetchSuppliers = async () => {
        try{
            const res = await axios.get("http://localhost:5000/api/suppliers");

console.log(res.data);

setSuppliers(res.data.data);
        }catch(err){
            console.error("Error fetching suppliers: ",err)
        }finally{
            setLoading(false)
        }
    }

    const handleDelete = async (id:number) => {
      const confirmDelete = window.confirm("Are you sure you want delete this supplier ?")
      if(!confirmDelete) return

      try
      {
        await axios.delete(`http://localhost:5000/api/suppliers/${id}`)
        alert("Supplier deleted successfully")
        fetchSuppliers()
      }catch(err){
        console.log(err)
        alert("Failed to delete supplier")
      }
    }

    useEffect(()=>{
        fetchSuppliers()
    },[])

    return (
  <div className="p-4">
    <div className="bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">
          Supplier Management
        </h2>

        <Link
  to="/suppliers/add"
  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
>
  + Add Supplier
</Link>
      </div>

      {/* Body */}
      <div className="p-6">
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : suppliers.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No suppliers found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="px-4 py-3 text-left">ID</th>
                  <th className="px-4 py-3 text-left">Supplier Name</th>
                  <th className="px-4 py-3 text-left">Contact Person</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Address</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {suppliers.map((supplier) => (
                  <tr
                    key={supplier.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{supplier.id}</td>
                    <td className="px-4 py-3">{supplier.supplier_name}</td>
                    <td className="px-4 py-3">{supplier.contact_person}</td>
                    <td className="px-4 py-3">{supplier.phone}</td>
                    <td className="px-4 py-3">{supplier.email}</td>
                    <td className="px-4 py-3">{supplier.address}</td>
                    <td className='px-3 py-3'>
                      <div className='flex gap-3'>
                        <Link
                          to={`/suppliers/edit/${supplier.id}`}
                          className='rounded bg-yellow-500 p-2 text-white hover:bg-yellow-700'
                        >
                          <FaEdit/>
                        </Link>
                        
                        <button
                          onClick={()=>handleDelete(supplier.id)}
                          className='rounded bg-red-600 p-2 text-white hover:bg-red-700'
                        >
                          <FaTrash/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default Suppliers