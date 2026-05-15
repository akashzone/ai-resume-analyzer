
const express = require("express");
const app = express();
const PORT = 5050;

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Root route is working");
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})