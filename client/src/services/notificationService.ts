import axios from "axios";

const API_URL = "http://localhost:5000/api"

export const getNotification = async () => {
    const response = await axios.get(`${API_URL}/notifications`)
    return response.data.data
}