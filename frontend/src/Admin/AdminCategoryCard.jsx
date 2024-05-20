import React, { useState } from 'react'
import { MdModeEdit } from "react-icons/md";
import AdminCategoryEdit from './AdminCategoryEdit';
import { MdDelete } from "react-icons/md";
import axios from 'axios';

const AdminCategoryCard = ({cat,fetchCat}) => {
  const handleDelete= async()=>{
    await axios.delete(`http://localhost:4000/api/v1/category/${cat._id}`)
    fetchCat();
    }
  const [isEdit,setisEdit]=useState(false)
  return (
    <div className=' border border-transparent bg-gray-50 p-6 relative '>
    <img className=' mx-auto w-44 h-48'  src={`${import.meta.env.VITE_URL}/download/${cat.photo}`} alt="no" />
    <h1 className=' font-semibold'>{cat.name}</h1>
    
    <MdModeEdit onClick={ ()=> setisEdit(true)} className=' absolute bottom-7 right-7 text-[21px] cursor-pointer' />
    <MdDelete onClick={handleDelete} className=' absolute bottom-7 text-[21px] right-1 cursor-pointer'/>
    {    isEdit? <AdminCategoryEdit fetchCat={fetchCat} cat={cat} onClose={()=> setisEdit(false)} /> : ""}

  </div>
  )
}

export default AdminCategoryCard
