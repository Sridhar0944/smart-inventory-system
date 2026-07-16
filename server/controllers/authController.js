const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");


// Register User

const register = async (req, res) => {

    try {

        const { name, email, password, role } = req.body;


        if(!name || !email || !password)
        {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }


        // Check Email Exists

        User.findUserByEmail(email, async (err, result)=>{

            if(err)
            {
                return res.status(500).json({
                    success:false,
                    message:"Database Error"
                });
            }


            if(result.length > 0)
            {
                return res.status(400).json({
                    success:false,
                    message:"Email Already Exists"
                });
            }


            // Hash Password

            const hashedPassword = await bcrypt.hash(password,10);



            const newUser = {

                name,
                email,
                password:hashedPassword,
                role:role || "staff"

            };



            User.createUser(newUser,(err,result)=>{

                if(err)
                {
                    return res.status(500).json({
                        success:false,
                        message:"Registration Failed"
                    });
                }


                res.status(201).json({

                    success:true,
                    message:"User Registered Successfully"

                });

            });


        });


    }catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};





// Login User

const login = (req,res)=>{


    const { email,password } = req.body;



    if(!email || !password)
    {
        return res.status(400).json({

            success:false,
            message:"Email and Password Required"

        });
    }



    User.findUserByEmail(email, async (err,result)=>{


        if(err)
        {
            return res.status(500).json({

                success:false,
                message:"Database Error"

            });
        }



        if(result.length === 0)
        {
            return res.status(404).json({

                success:false,
                message:"Invalid Email or Password"

            });
        }



        const user = result[0];



        // Compare Password

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );



        if(!isMatch)
        {
            return res.status(401).json({

                success:false,
                message:"Invalid Email or Password"

            });
        }




        // Generate JWT Token

        const token = jwt.sign(

            {
                id:user.id,
                email:user.email,
                role:user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn:"1d"
            }

        );




        res.status(200).json({

            success:true,

            message:"Login Successfully",

            token,

            user:{
                id:user.id,
                name:user.name,
                email:user.email,
                role:user.role
            }

        });


    });


};



module.exports = {
    register,
    login
};