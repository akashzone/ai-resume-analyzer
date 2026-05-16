

const getProfile = (req,res)=>{
    return res.status(201).json({
        message : "Access to protected route /profile",
    });
}

module.exports = { getProfile };