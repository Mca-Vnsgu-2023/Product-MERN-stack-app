const mongoose = require("mongoose");

const ProductSchema= mongoose.Schema({
    productId: Number,
    title: String,
    price: String,
});

const productModel=mongoose.model("product",ProductSchema, "product");

module.exports=productModel