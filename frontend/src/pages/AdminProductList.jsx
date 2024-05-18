import React, { useEffect, useState } from 'react'
import AdminPanel from './AdminPanel'
import axios from 'axios'
import AdminProductCard from '../components/AdminProductCard'
import { Link } from 'react-router-dom'
import AdminCreateProduct from '../components/AdminCreateProduct'

const AdminProductList = () => {
  const [createProduct,setCreateProduct]= useState(false)
  const [products,setProducts]= useState([])
  const fetchProducts= async()=>{
    const {data}= await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/get-all-products`,{withCredentials:true})
   setProducts(data.data
   )
  } 
  useEffect(()=>{
fetchProducts();
  },[])
 
  return (
   <div className='mt-20 pr-10'>
   <div  className=' flex items-end justify-end'><button onClick={()=>setCreateProduct(true)} className='  py-1 px-2 rounded-md text-white text-[20px] font-medium mb-4 bg-blue-500 overflow-hidden  '  >Create Product</button></div>
   {createProduct ? <AdminCreateProduct fetchData={fetchProducts} onClose={()=>setCreateProduct(false)}/> : ""}
   
   <div className=' flex   items-start  '>
      <AdminPanel/>

      <div className=' grid grid-cols-4 gap-5'>{products?.map((product,index)=> ( <div className=' flex items-center justify-center'><AdminProductCard  price={product
        .price} photo={product.photo} key={index} name= {product.name}/></div>))}</div>



    </div></div>
  )
}

export default AdminProductList
