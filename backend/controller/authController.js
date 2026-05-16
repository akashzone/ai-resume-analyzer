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

module.exports = { registerUser }