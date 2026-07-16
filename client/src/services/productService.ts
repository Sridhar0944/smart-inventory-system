import axios from "axios";

const API_URL = "http://localhost:5000/api/products";


const getAuthHeader = () => {

    const token = localStorage.getItem("token");

    console.log("JWT Token:", token);

    return {
        Authorization: `Bearer ${token}`,
    };

};

export const getProductById = async (id:number) => {
    const token = localStorage.getItem("token")

    const response = await axios.get(`http://localhost:5000/api/products/${id}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    return response
}

// Get all products

export const getProducts = async () => {

    const token = localStorage.getItem("token")
    console.log("Token From Storage: ",token)

    const response = await axios.get(
        "http://localhost:5000/api/products",
        {
            headers: getAuthHeader()
        }
    );

    return response.data;

};



// Get single product

export const getProduct = async (id:number) => {

    const response = await axios.get(
        `${API_URL}/${id}`,
        {
            headers:getAuthHeader()
        }
    );

    return response.data;

};



// Add Product

export const addProduct = async (product: FormData) => {

    const response = await axios.post(
        API_URL,
        product,
        {
            headers: {
                ...getAuthHeader(),
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};



// Update Product

export const updateProduct = async (
  id: number,
  product: any
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    product,
    {
      headers: getAuthHeader(),
    }
  );

  return response.data;
};



// Delete Product

export const deleteProduct = async(id:number)=>{


    const response = await axios.delete(
        `${API_URL}/${id}`,
        {
            headers:getAuthHeader()
        }
    );


    return response.data;

};