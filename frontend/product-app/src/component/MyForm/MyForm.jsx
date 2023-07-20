import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MyForm = (props) => {

    const { id, handleClose, handleAfterSubmit } = props

    const [inputData, setInputData] = useState({
        productId: "",
        title: "",
        price: ""
    })

    useEffect(() => {
        if (id != null) {
            axios.get(`http://localhost:3001/product/getById/${id}`).then((res) => {
                setInputData(res?.data)
            })
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData({
            ...inputData,
            [name]: value
        })
    }

    const AddProductData = () => {
        const { productId, title, price } = inputData
        if (productId && title && price) {
            axios.post('http://localhost:3001/product/addProduct', inputData)
                .then(res => {
                    alert(res.data.message)
                    handleClose(false)
                    handleAfterSubmit()
                })
        } else {
            alert("Product name is required.")
        }
    }

    const UpdateProductData = () => {
        const { productId, title, price } = inputData
        inputData.productId = id
        console.log("ID::", id)
        if (productId && title && price) {
            axios.put(`http://localhost:3001/product/updateProduct/${id}`, inputData)
                .then(res => {
                    alert(res.data.message)
                    handleClose(false)
                    handleAfterSubmit()
                })
        } else {
            alert("Product not found.")
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        return id == null ? AddProductData() : UpdateProductData()
    }


    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <input className='form-control' name="productId" type='text' placeholder="Enter ProductId"
                    value={inputData.productId} onChange={handleChange} />&nbsp;
                <input className='form-control' name="title" type='text' placeholder="Enter Product Name"
                    value={inputData.title} onChange={handleChange} />&nbsp;
                <input className='form-control' name="price" type='text' placeholder="Enter Product Price"
                    value={inputData.price} onChange={handleChange} /><br />
                <button type='submit' className='btn btn-primary'>Save</button>
            </form>
        </div>
    )
}

export default MyForm