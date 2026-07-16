import axios from "axios";

const API_URL = "http://localhost:5000/api/suppliers";

export const getSuppliers = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};