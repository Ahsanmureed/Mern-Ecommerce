import React from 'react'
import { MdModeEdit } from "react-icons/md";

const AdminProductCard = ({name,photo,price}) => {
  const n = `../uploads/`
  console.log(photo);
  return (
    <div className=' border border-transparent bg-gray-50 p-6 relative '>
      <img className=' mx-auto w-44 h-48'  src={`${import.meta.env.VITE_URL}/download/${photo}`} alt="no" />
      <h1 className=' font-semibold'>{name.substring(0, 30)}..</h1>
      <h1 className=' font-bold'>{price}$ </h1>
      <MdModeEdit className=' absolute bottom-7 right-4 text-[21px] cursor-pointer' />

    </div>
  )
}

export default AdminProductCard