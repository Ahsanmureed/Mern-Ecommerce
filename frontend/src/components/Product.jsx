import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../Context/CartContext'
const Product = ({product}) => {
  const {cart,setCart}= useContext(CartContext)
  return (
    <div className="  relative mx-10 my-6 flex  w-full max-w-xs flex-col overflow-hidden rounded-lg border-2 border-gray-100 bg-white shadow-md">
<Link className="relative mx-3 mt-3 flex items-center  overflow-hidden rounded-xl" to={`/product/${product.slug}`}>
<img className=" object-cover md:w-72" src={product.photo} alt="product image" />
</Link>
    

  
  <div className="mt-4 px-5 pb-5">
   <h1>{product.name.substring(0, 30)}</h1>
    <div className="mt-2 mb-5 flex items-center justify-between">
     
        <p className="text-3xl font-bold text-slate-900">{product.price}$</p>
        
      
      
    </div>
<button onClick={()=>{setCart([...cart,product]); localStorage.setItem("cart",JSON.stringify([...cart,product]))}} className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
<svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    Add To Cart</button>
    
  </div>
</div>

  )
}

export default Product