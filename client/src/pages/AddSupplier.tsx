import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const AddSupplier = () => {
    const navigate = useNavigate()

    const [ formData , setFormData ] = useState({
        supplier_name:"",
        contact_person:"",
        phone:"",
        email:"",
        address:""
    })

    const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async (e:React.FormEvent <HTMLFormElement>) => {
        e.preventDefault()

        try{
            await axios.post( "http://localhost:5000/api/suppliers",formData)
            alert("Supplier Added Successfully")
            navigate("/suppliers")
        }catch(err){
            console.error(err)
            alert("Failed to add supplier")
        }
    }

    return(
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Add Supplier
                </h1>
                <p className="text-gray-500 mt-2">
                    Enter supplier details below.
                </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-2"
                >
                    <div className="md:col-span-2">
                        <label className="block mb-2 font-semibold">
                            Supplier Name
                        </label>
                        <input
                            type="text"
                            name="supplier_name"
                            value={formData.supplier_name}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2
                            focus:rind-blue-500 outline-none"
                        />
                    </div>
                    <div >
                        <label className="block mb-2 font-semibold">
                            Contact Person
                        </label>
                        <input
                            type="text"
                            name="contact_person"
                            value={formData.contact_person}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2
                            focus:rind-blue-500 outline-none"
                        />
                    </div>
                    <div >
                        <label className="block mb-2 font-semibold">
                            Phone
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2
                            focus:rind-blue-500 outline-none"
                        />
                    </div>
                    <div >
                        <label className="block mb-2 font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2
                            focus:rind-blue-500 outline-none"
                        />
                    </div>
                    <div >
                        <label className="block mb-2 font-semibold">
                            Address
                        </label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2
                            focus:rind-blue-500 outline-none"
                        />
                    </div>
                    <div className="md:col-span-2 flex gap-4">
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white
                            py-3 rounded-xl font-semibold"
                        >
                            Add Supplier
                        </button>
                        <Link
                            to="/suppliers"
                            className="flex-1 border rounded-xl py-3 text-center hover:bg-gray-100"
                        >
                            Cancel
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}