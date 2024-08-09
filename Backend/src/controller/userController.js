import User from "../models/userModel.js"

export const createUser = async (req, res,next) => {
    console.log("hi..........................")

    try {
        const { name, email, password } = req.body;
        console.log("name, email, password", name, email, password);

        // Check if all fields are provided
        if (!name || !email || !password) {
           next('All fields are mandatory')
        }

        // Check if the user already exists
        const existUser = await User.findOne({ email });
        if (existUser) {
            next("User already exists")
        }

        // Create the user
        const user = await User.create({ name, email, password });
         
        //create token
        const token = user.createJWT()

        
        // Send success response
        res.status(201).send({
            message: "User registered successfully",
            success: true,
            user,token
        });

    } catch (error) {
       next()
    }
}


export const userLogin = async(req,res,next) => {
    const {email,password} = req.body;

    if(!email || !password){
        res.send({
            message : "All fields are mandatory",
            success : false            
        })
    }
    
    const user = await User.findOne({email});

    if(!user){
        next("Invalid email and password")
    }

    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        next("Invalid email and password ")
    }
   const token = user.createJWT()
   res.status(200).send({
    success : true,
    message : "user login successfully",
    user,token
   })
}