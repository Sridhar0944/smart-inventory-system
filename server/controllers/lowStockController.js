const Product = require("../models/productModel")

const getLowStockProducts = (req,res) => {
    Product.getLowStockProducts((err,result)=>{
        if(err)
        {
            return res.status(500).json({
                success:false,
                message:err.message
            })
        }
        res.status(200).json({
            success:true,
            data:result
        })
    })
}

module.exports = {getLowStockProducts}