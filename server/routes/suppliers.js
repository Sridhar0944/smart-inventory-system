const express = require("express")
const router = express.Router()
const db = require("../config/db")

// Get all supplier

router.get("/",(req,res)=>{
    const sql = "SELECT * FROM suppliers ORDER BY id DESC"

    db.query(sql,(err,result)=>{
        if(err)
        {
            return res.status(500).json(err)
        }
        res.json(result)
    })
})

// Add supplier

router.post("/",(req,res)=>{
    const {
        supplier_name,
        contact_person,
        phone,
        email,
        address,
    } = req.body

    // Validation

    if(!supplier_name)
    {
        return res.status(400).json({
            message:"Supplier name is Require"
        })
    }

    const sql = `
        INSERT INTO suppliers
        (supplier_name,contact_person,phone,email,address)
        VALUES (?,?,?,?,?)
    `

    db.query(
        sql,
        [
            supplier_name,
            contact_person,
            phone,
            email,
            address
        ],
        (err,result) => {
            if(err)
            {
                return res.status(500).json(err)
            }
            res.status(201).json({
                message:"Supplier added successfully",
                id:result.insertId
            })
        }
    )
})

// Update supplier

router.put("/:id",(req,res)=>{
    const {id} = req.params

    const {
        supplier_name,
        contact_person,
        phone,
        email,
        address
    } = req.body

    if(!supplier_name){
        return res.status(400).json({
            message:"Supplier name is Required"
        })
    }

    const sql = `
        UPDATE suppliers
        SET
            supplier_name = ?,
            contact_person = ?,
            phone = ?,
            email = ?,
            address = ?,
        WHERE id = ?
    `
    db.query(sql,[
        supplier_name,
        contact_person,
        phone,
        email,
        address
    ],
    (err,result) => {
        if(err)
        {
            return res.status(500).json(err)
        }
        res.json({
            message:"Supplier updated successfully"
        })
    }
)
})

// Delete supplier

router.delete("/:id",(req,res)=>{
    const {id} = req.params

    const sql = "SELECT * FROM suppliers WHERE id = ?"

    db.query(sql,[id],(err,result)=>{
        if(err)
        {
            return res.status(500).json(err)
        }
        if(result.affectedRows === 0)
        {
            return res.status(404).json({
                message:"Supplier not found"
            })
        }

        res.json({
            message:"Supplier delete successfully"
        })
    })
})
module.exports = router