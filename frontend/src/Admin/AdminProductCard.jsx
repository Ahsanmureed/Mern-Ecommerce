import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminProductEdit from "./AdminProductEdit"
import { MdDelete } from "react-icons/md";
import axios from 'axios';


const AdminProductCard = ({product,fetchData}) => {
  const [isEditOpen,setIsEditOpen]= useState(false)
  const handleDelete= async()=>{
  await axios.delete(`http://localhost:4000/api/v1/product/${product._id}`)
  fetchData();
  }

  return (
    <div className=' border border-transparent bg-gray-50 p-6 relative '>
      <img className=' mx-auto w-44 h-48'  src={`http://localhost:4000/download/${product.photo}`} alt="no" />
      <h1 className=' font-semibold'>{product.name.substring(0, 40)}..</h1>
      <h1 className=' font-bold'>{product.price}$ </h1>
      <MdModeEdit onClick={()=> setIsEditOpen(true)} className=' absolute bottom-7 right-7 text-[21px] cursor-pointer' />
      <MdDelete onClick={handleDelete} className=' absolute bottom-7 text-[21px] right-1 cursor-pointer'/>
     {isEditOpen ? <AdminProductEdit fetchData={fetchData} product={product} onClose={()=> setIsEditOpen(false)}/> : ""}
    </div>
  )
}

export default AdminProductCard
