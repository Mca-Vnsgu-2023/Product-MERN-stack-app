const express = require('express');
const productModel = require('../model/product');
const router = express.Router()
router.use(express.json());


router.get('/GetAllProducts', async (req, res) => {
    const Productslist = await productModel.find();
    if (Productslist.length === 0) {
        return res.send({ message: "No data found." })
    }
    return res.send({ data: Productslist })
})


router.post('/addProduct', async(req, res) => {
    const newProduct = req.body;
    if (!newProduct.title && newProduct.productId) {
        return res.send({ message: "Please enter Product name." })
    }
    else {
        await productModel.create(newProduct);
        return res.send({ message: "Product add successfully..!" })
    }

})

router.get('/getById/:productId', async(req,res)=>{
    const Id= req.params.productId;
    if(Id){
        const productData= await productModel.findOne({'productId': Id})
        return res.send(productData)
    }
})


router.put('/updateProduct/:productId', async (req, res) => {
    const Id = req.params.productId;
    const ProductTitle = req.body.title;
    const ProductPrice = req.body.price;
    const data = await productModel.findOne({ "productId": Id })
    if (!data) {
        res.send({ message: "No record found." })
    }
    else {
        await productModel.updateOne({ _id: data._id }, { $set: { title: ProductTitle, price: ProductPrice } })
            .then(function () {
                console.log("Data Updated");
                res.send({ message: "Data Updated.." })
            })
    }
})


router.delete('/deleteProduct/:productId', async(req, res) => {
    const Id = req.params.productId;
    await productModel.deleteOne({ "productId": Id }).then(function () {
        console.log("Data Deleted");
        res.send({ message: "Data Deleted.." })
    })
})


router.get('/searchProduct/:searchData', async (req, res) => {
    let data = await productModel.find(
        {
            "$or": [
                {title:{$regex: req.params.searchData}},
                {price:{$regex: req.params.searchData}}
            ]
        }
    )
    res.send(data)
})

module.exports = router
