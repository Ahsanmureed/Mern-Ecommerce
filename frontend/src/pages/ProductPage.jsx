import React, { useEffect, useState } from 'react'
import axios from "axios"
import Product from '../components/Product'
import {Link, useNavigate} from "react-router-dom"

const ProductPage = () => {
    const Navigate= useNavigate()
    const [products,setProducts] = useState([])
    const getAllProducts = async()=>{
      try {
        const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/get-products`)
       setProducts(res.data.products)

      } catch (error) {
        
      }
    }
    useEffect(()=>{
        getAllProducts()
    },[])
   
  return (
    <div className='  md:grid md:grid-cols-3   '>
        
        {products?.map((product)=>(
            <div className='  flex items-center justify-center'><Product key={product._id} product={product} /></div>
        ))}
    </div>
  )
}

export default ProductPage