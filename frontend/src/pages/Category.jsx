import React, { useEffect, useState } from 'react'
import axios from "axios"
import {useParams} from "react-router-dom"
import Product from '../components/Product'
const Category = () => {
    const [products,setProducts] = useState([])
    const [cat,setCat] = useState([])
    const slug = useParams().slug;

    
    const getProducts = async()=>{
        const res= await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/product-category/${slug}`)
        setProducts(res.data.products)
        setCat(res.data.category)
    }
useEffect(()=>{
   getProducts()
},[])

  return (
    <div className=' mt-20'>
    <h1 className=' text-3xl font-poppins font-semibold uppercase'>{cat.name}</h1>

    <div className='  md:grid md:grid-cols-3'>
        
        {
            products?.map((product)=>(
                <div className='  flex items-center justify-center'><Product product={product}/></div>
            ))
        }
    </div>
    </div>
  )
}

export default Category