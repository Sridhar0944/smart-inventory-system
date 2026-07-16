const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    console.log("AUTH HEADER:", authHeader);

    if (!authHeader) {
        return res.status(401).json({
            success:false,
            message:"Access Denied. No Token Provided."
        });
    }


    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success:false,
            message:"Invalid Token Format"
        });
    }


    const token = authHeader.split(" ")[1];


    try {

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("USER:", decoded);

        req.user = decoded;

        next();

    } catch(error){

        console.log("JWT ERROR:", error.message);

        return res.status(401).json({
            success:false,
            message:"Invalid Token"
        });
    }

};


module.exports = authMiddleware;