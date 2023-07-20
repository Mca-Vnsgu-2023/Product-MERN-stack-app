import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddProduct from '../AddProduct/AddProduct'
import MyModal from '../Modal/MyModal'
import MyForm from '../MyForm/MyForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

const DisplayProduct = () => {

    const [productData, setProductData] = useState([])
    const [show, setShow] = useState()
    const [pId, setPId] = useState(null)
    const [searchData, setSearchData] = useState("")

    const GetAllProduct = () => {
        axios.get('http://localhost:3001/product/GetAllProducts').then((res) => {
            setProductData(res?.data?.data)
        })
    }

    const DeleteProduct = (id) => {
        setPId(id)
        axios.delete(`http://localhost:3001/product/deleteProduct/${id}`).then((res) => {
            alert(res.data.message)
            GetAllProduct()
        })
    }

    const SearchProduct = () => {
        // console.log(searchData)
        if (searchData != "") {
            axios.get(`http://localhost:3001/product/searchProduct/${searchData}`).then((res) => {
                setProductData(res.data)
            })
        } else {
            GetAllProduct()
        }
    }

    const handleChange = (e) => {
        setSearchData(e.target.value)
        SearchProduct()
    }

    useEffect(() => {
        GetAllProduct()
    }, [])


    const handleAfterSubmit = () => {
        GetAllProduct()
    }

    const updateProduct = (id) => {
        handleShow();
        setPId(id)
    }

    const handleClose = () => {
        setShow(false)
    }

    const handleShow = () => {
        setShow(true)
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-2'>
                    <AddProduct handleAfterSubmit={handleAfterSubmit} />
                </div>
                <div className='col-10' style={{paddingTop: "20px"}}>
                    <input type="text" placeholder='Search Here..' value={searchData} onChange={handleChange} />
                </div>
            </div>
            {(productData.length > 0) &&
                <div className='row'>
                    <div className='col-sm-12'>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>SNo.</th>
                                    <th>Product Name</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    productData.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.productId}</td>
                                                <td>{item.title}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    <button className='btn btn-success' onClick={() => updateProduct(item?.productId)}> <FontAwesomeIcon icon={faEdit} /></button> &nbsp;
                                                    <button className='btn btn-danger' onClick={() => DeleteProduct(item?.productId)}><FontAwesomeIcon icon={faTrash} /></button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            }

            <MyModal show={show} handleClose={handleClose} title={"Update Product"}>
                <MyForm id={pId} handleClose={(show1) => handleClose(show1)} handleAfterSubmit={handleAfterSubmit} />
            </MyModal>

        </div>
    )
}

export default DisplayProduct