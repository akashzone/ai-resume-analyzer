
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const authMiddleware = async (req,res,next)=>{
    const header = req.headers.authorization;
    const token = header.split(" ")[1];
    // console.log(token);

   try{
     if(!token){
        return res.status(401).json({
            message : "Token is empty !"
        });
    }
    const decode = await jwt.verify(token,JWT_SECRET);
    req.user = decode;
    // console.log("Decoded :", decode);
    next()
   }catch(err){
    res.status(401).json({
        message : err
    });
   }
}

module.exports = authMiddleware;