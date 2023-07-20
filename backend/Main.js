// const express = require("express");
// const app = express()
// const port = 3001
// const fs = require("fs");
// const { router } = require("express").Router();
// app.use(express.json())
// const Products = require('./product.json')


// const getProductData = () => {
//     const jsonData = fs.readFileSync("product.json")
//     return JSON.parse(jsonData)   
// }

// app.get('/', (req, res) => {
//     res.json({
//         message: "API is working"
//     })
// })

// app.get('/api/products', (req, res) => {
//     res.json({
//         Products
//     })
// })

// app.post('/api/addProduct', (req, res) => {
//     if (!req.body.title) {
//         res.send(400, { message: "Title is require." })
//     }
//     else {
//         const data = {
//             id: Products.length + 1,
//             title: req.body.title,
//             price: req.body.price
//         }
//         Products.push(data)
//         var newData2 = JSON.stringify(Products);
//         fs.writeFile("product.json", newData2, (err) => {
//             if (err) throw err;
//             console.log("New data added");
//         });
//         return res.json(data)

//     }
// })


// // app.put('/api/updateProduct/:id',(req,res)=>{
// //         const ProductId= req.params.id
// //         const index=Products.findIndex((product)=>{
// //             return (product.id == Number.parseInt(id))
// //         })
// //         res.send({message : index})
// // })


// app.listen(port, console.log(`App runnig on ${port} ..!`))