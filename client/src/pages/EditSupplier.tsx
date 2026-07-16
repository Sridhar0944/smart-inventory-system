import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

const EditSupplier = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    supplier_name: "",
    contact_person: "",
    phone: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    fetchSupplier();
  }, []);

  const fetchSupplier = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/suppliers/${id}`
      );

      setFormData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/suppliers/${id}`,
        formData
      );

      alert("Supplier Updated Successfully");

      navigate("/suppliers");
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Edit Supplier
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-xl p-6 space-y-5"
      >
        <input
          type="text"
          name="supplier_name"
          value={formData.supplier_name}
          onChange={handleChange}
          placeholder="Supplier Name"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="contact_person"
          value={formData.contact_person}
          onChange={handleChange}
          placeholder="Contact Person"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border rounded-lg p-3"
        />

        <textarea
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          rows={4}
          className="w-full border rounded-lg p-3"
        />

        <div className="flex gap-4">
          <button
            className="flex-1 bg-blue-600 text-white rounded-lg py-3"
          >
            Update Supplier
          </button>

          <Link
            to="/suppliers"
            className="flex-1 border rounded-lg py-3 text-center"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditSupplier;