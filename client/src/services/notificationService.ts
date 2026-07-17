import axios from "axios";

const API_URL = "import.meta.env.VITE_API_URL/api"

export const getNotification = async () => {
    const response = await axios.get(`${API_URL}/notifications`)
    return response.data.data
}