import React, { useEffect, useState } from 'react'
import axios from "axios"
import {useParams} from "react-router-dom"
import Product from '../components/Product'
import LoaderLoader from '../components/LoaderLoader'
const Category = () => {
    const [products,setProducts] = useState([])
    const [cat,setCat] = useState([])
    const slug = useParams().slug;
    const [loader,setLoader]=useState(false)


    
    const getProducts = async()=>{
        setLoader(true)
        try {
            const res= await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/product-category/${slug}`)
        setProducts(res.data.products)
        setLoader(false)
        setCat(res.data.category)
        } catch (error) {
            setLoader(false)
        }
    }
useEffect(()=>{
   getProducts()
},[])

  return (
    <div>
        {
loader? <div  className="h-[80vh] flex justify-center items-center w-full"><LoaderLoader/></div>  : <div className=' mt-20'>
<h1 className=' text-3xl font-poppins mb-2  mt-5 font-semibold uppercase underline underline-offset-auto'>{products.length <1 ?'':cat.name + ':'}</h1>

{
    products.length <1 ?<h1 className='text-2xl py-5 text-center font-semibold'>No Products Available in this Category</h1>:<div className='  md:grid md:grid-cols-3'>
    
    {
        products?.map((product)=>(
            <div className='  flex items-center justify-center'><Product key={product._id} product={product}/></div>
        ))
    }
</div>
}
</div>
    }
    </div>
  )
}

export default Category