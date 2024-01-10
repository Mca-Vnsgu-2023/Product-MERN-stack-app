const express=require("express");
const mongoose= require("mongoose");
const app=express();
const cors= require("cors")
require("dotenv").config();

app.use(express.json());
app.use(express.Router());
app.use(cors());

const port= process.env.PORT || 3000;

const ProductRoutes= require('./routes/products')
app.use('/product',ProductRoutes)

mongoose.connect(process.env.MONGOURL).then(()=> console.log("MongoDB connected successfully. "))

app.get('/',(req,res)=>{
    res.send("Hello world..")
})

app.listen(port, ()=> console.log(`Example app listening on port ${port} !`))