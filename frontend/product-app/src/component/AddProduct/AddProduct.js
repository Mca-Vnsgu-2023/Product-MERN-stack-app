import React, { useState } from 'react'
import MyModal from '../Modal/MyModal'
import MyForm from '../MyForm/MyForm'


const AddProduct = (props) => {

    const{handleAfterSubmit}=props
    const[show,setShow]= useState()

    const handleClose=()=>{
        setShow(false)
    }

    const handleShow=()=>{
        setShow(true)
    }

    
    return (
        <div className='container'>
            <div style={{paddingTop: "20px"}}>
                <button className='btn btn-primary' onClick={handleShow}>Add Product</button>
            </div>
            <MyModal show={show} handleClose={handleClose} title={"Add Product"}>
                <MyForm handleClose={(show1)=>handleClose(show1)} handleAfterSubmit={handleAfterSubmit}/>
            </MyModal>
        </div>
    )
}

export default AddProduct