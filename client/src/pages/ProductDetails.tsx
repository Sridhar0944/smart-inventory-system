import { useEffect,useState } from "react";
import {useParams } from "react-router-dom";

import { getProductById } from "../services/productService";

import BarcodeGenerate from "../components/product/BarcodeGenerate";
import QRGenerate from "../components/product/QRGenerate";
import ProductLabel from "../components/product/ProductLabel";
import { printLabel } from "../utils/printLabel";

interface Product {
    id:number,
    product_name:string,
    barcode:string,
    price:string,
    qr_code:string,
    quantity:number,
    minimum_stock:number
}


const ProductDetails = () => {
    const {id} = useParams()
    const [product , setProduct ] = useState<Product | null>(null)
    const [loading,setLoading] = useState(true)

    useEffect(()=>{
        const fetchProduct = async () => {
            try{
            const response = await getProductById(Number(id))
            
            console.log("Full Response: ",response)
            console.log("Product Details: ",response.data)
            console.log("Product Code:", response.data.product_code);
            console.log("All Keys: ",Object.keys(response.data))

            setProduct(response.data.data || response.data)
            }catch(error){
                console.error(error);
            }finally{
                setLoading(false)
            }
        }
        fetchProduct()
    },[id])

    if(loading){
        return(
            <div className="p-6">
                Loading Product Details ...
            </div>
        )
    }

    if(!product)
    {
        return(
            <div className="p-6">
                Product Not Found
            </div>
        )
    }

    return(
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">
                Product Details
            </h1>

            <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-bold">
                    {product.product_name}
                </h2>
                <p className="mt-2">
                    Product Code: {product.barcode}
                </p>
                <p>
                    Price: {product.price}
                </p>
                <p>
                    Quantity: {product.quantity}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <BarcodeGenerate
                    value={product.barcode}
                />

                <QRGenerate
                    data={{
                        id:product.id,
                        name:product.product_name,
                        code:product.barcode,
                        price:product.price
                    }}
                />
            </div>
            <button
                onClick={printLabel}
                className="rounded-lg bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
                Print Label
            </button>
            <ProductLabel product={product}/>
        </div>
    )
}

export default ProductDetails