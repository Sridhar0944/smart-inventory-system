import axios from 'axios';

const API = "http://localhost:5000/api/reports";

export const getReports = () => {
    return axios.get(API)
}