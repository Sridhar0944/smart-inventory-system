const db = require("../config/db");

exports.getProfile = async (req,res) => {
    try{
        // Temporary: fetch the first user
        const [rows] = await db.query(
            "SELECT id,name,email,role FROM users LIMIT 1"
        )

        if(rows.length === 0)
        {
            return res.status(404).json({
                message:"User not found"
            })
        }

        res.json(rows[0])
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:"Server Error"
        })
    }
}