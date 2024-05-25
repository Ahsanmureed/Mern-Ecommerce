import React, {  useEffect, useState } from 'react'

import Product from '../components/Product'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import LoaderLoader from '../components/LoaderLoader'

const SearchResult = () => {
  const query= useLocation();
    
    const [loader,setLoader]=useState(false)
    const [products,setProducts]=useState([])

   const fetchProducts = async()=>{
   try {
    setLoader(true)
    const { data } =await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/search${query.search}`)
    setProducts(data.data)
    setLoader(false)
   } catch (error) {
    setLoader(false)
   }

   }
   useEffect(()=>{
  fetchProducts();
   },[query])
   
   
   return (
   <>
   {
    loader ? <div><LoaderLoader/></div>: <> <div className='pt-24 '><h1 className=' text-center  text-3xl font-poppins font-bold'>{products === " " && products <1 ? "No Products Found":`found ${products?.length} Products`}</h1>
    <div className=' md:grid md:grid-cols-3'>
    {products?.map((product)=>  (
     <div className='  flex items-center justify-center'><Product product={product}/></div>
      ))}
    </div>
      
    </div></>
   }
   </>
  )
}

export default SearchResult