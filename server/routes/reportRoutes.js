const express = require("express")
const router = express.Router()
const db = require("../config/db")

// Get all transaction reports

router.get("/",(req,res)=>{
    const sql = `
        SELECT
            st.id,
            p.product_name,
            st.type,
            st.quantity,
            st.remarks,
            st.created_at
        FROM stock_transactions at
        JOIN products p
            ON st.product_id = p.id
        ORDER BY st.created_at ASC
    `
    db.query(sql,(err,result)=>{
        if(err) return res.status(500).json(err)
        res.json(result)
    })
})

module.exports = router