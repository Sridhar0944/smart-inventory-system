import axios from "axios";

const API_URL = "http://localhost:5000/api/dashboard";

export const getDashboardStats = async () => {
  try {
    const response = await axios.get(API_URL);

    return response.data;
  } catch (error) {
    console.log("Error fetching dashboard stats:", error);
    throw error;
  }
};