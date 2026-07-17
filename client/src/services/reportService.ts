import axios from 'axios';

const API = "import.meta.env.VITE_API_URL/api/reports";

export const getReports = () => {
    return axios.get(API)
}