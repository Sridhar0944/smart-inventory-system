import axios from "axios";

const API_URL = "http://localhost:5000/api/stock";


export interface StockPayload {
  product_id:number;
  quantity:number;
  remarks:string;
}


export const stockIn = async(payload:StockPayload)=>{

  const response = await axios.post(
    `${API_URL}/in`,
    payload
  );

  return response.data;

};



export const stockOut = async(payload:StockPayload)=>{

  const response = await axios.post(
    `${API_URL}/out`,
    payload
  );

  return response.data;

};



export const getHistory = async()=>{

  const response = await axios.get(
    `${API_URL}/history`
  );

  return response.data;

};