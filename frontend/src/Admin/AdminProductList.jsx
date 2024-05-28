import React, { useEffect, useState } from 'react'
import AdminPanel from './AdminPanel'
import axios from 'axios'
import AdminProductCard from './AdminProductCard'
import { Link } from 'react-router-dom'
import AdminCreateProduct from './AdminCreateProduct'
import LoaderLoader from '../components/LoaderLoader'

const AdminProductList = () => {
  const [loader,setLoader]=useState(false)
  const [createProduct,setCreateProduct]= useState(false)
  const [products,setProducts]= useState([])
  const fetchProducts= async()=>{
  try {
    setLoader(true)
    const {data}= await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/get-all-products`,{withCredentials:true})
    setLoader(false)
    setProducts(data.data)
  } catch (error) {
    setLoader(false)
  }
   
  } 
  useEffect(()=>{
fetchProducts();
  },[])
  
  return (
   <>
   {
    loader ? <LoaderLoader/> :<><div className='mt-[74px] pr-20'>
    <div  className=' flex items-end justify-end'><button onClick={()=>setCreateProduct(true)} className='  py-1 px-2 rounded-md text-white text-[20px] font-medium mb-4 bg-blue-500 overflow-hidden  '  >Create Product</button></div>
    {createProduct ? <AdminCreateProduct fetchData={fetchProducts} onClose={()=>setCreateProduct(false)}/> : ""}
    
    <div className=' flex   items-start  '>
       <AdminPanel/>
 
       <div className=' grid grid-cols-4 gap-5'>{products?.map((product,index)=> ( <div className=' flex items-center justify-center'><AdminProductCard fetchData= {fetchProducts} key={index}  product={product} /></div>))}</div>
 
 
 
     </div></div></>
   }
   </>
  )
}

export default AdminProductList
