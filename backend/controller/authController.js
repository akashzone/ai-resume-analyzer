const User = require("../models/User.js");

const registerUser = async (req,res)=>{
    const { username, email, password } = req.body;
    console.log("Username :",username);

    try{
        const alreadyExist = await User.findOne({email});
        if (alreadyExist){
            res.status(401).json({
                message : "User already exist, Login!"
            });
        }
        const userData = await User({
            username,
            email,
            password
        });

        console.log(userData);
        await userData.save();

        res.status(201).json({
            message : "Registered Successfully.",
            user : userData
        });

    }catch(err){
        res.status(401).json({
            message : "Err occured, enter values on all fields."
        });
    }
}


const loginUser = async(req,res)=>{
    const { email, password } = req.body;
    try{
        const userData = await User.findOne({email});
        console.log("alreadyExist : ",userData);
        if(userData){
            if (userData.password == password){
                res.status(201).json({
                    message: "LoggedIn Successfully",
                    user: userData
                });
            }
        }else{
            res.status(401).json({
                message: "User not exist"
            })
        }
    }catch(err){
        res.status(401).json({
            message : "Invalid Data"
        });
    }
}

module.exports = { registerUser,loginUser }