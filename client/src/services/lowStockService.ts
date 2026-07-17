import axios from "axios";

const API_URL = "import.meta.env.VITE_API_URL/api/low-stock";

const getAuthHeader = () => {
    const token = localStorage.getItem("token")
    return{
        Authorization: `Bearer ${token}`,
    }
}

export const getLowStockProducts = async () => {
    const response = await axios.get(API_URL,{
        headers: getAuthHeader()
    })

    return response.data
}