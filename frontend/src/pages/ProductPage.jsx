import React, { useEffect, useState } from 'react'
import axios from "axios"
import Product from '../components/Product'
import {Link, useNavigate} from "react-router-dom"
import LoaderLoader from '../components/LoaderLoader'

const ProductPage = () => {
    const Navigate= useNavigate()
    const [products,setProducts] = useState([])
    const [page,setPage]= useState(1);
    const [loading, setLoading] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [total, setTotal] = useState(0);
    const getAllProducts = async()=>{
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/get-products`,{
          params:{
            page:page,
            size:6
          }
        }
      
    )
    setTotal(res.data?.count)
    setLoading(false);
       setProducts(res.data.products)

      } catch (error) {
        
      }
    }
  
    useEffect(()=>{
        getAllProducts()
        
        
    },[])
    const loadMore = async () => {
      setLoadingMore(true)
      try {
       
         const {data} = await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/get-products`,{
          params:{
            page:page,
            size:6
          }
        }
      
    )
       setLoadingMore(false)
        setProducts([...products, ...data?.products]);
      } catch (error) {
        console.log(error);
        setLoadingMore(false)
      }
    };
    useEffect(() => {
      if (page === 1) return;
      loadMore();
    }, [page]);
  return (
    <><div>{loading ? <LoaderLoader/> : <div className='  md:grid md:grid-cols-3   '>
        
    {products?.map((product)=>(
        <div className='  flex items-center justify-center'><Product key={product._id} product={product} /></div>
    ))}
  
</div>}



{products && products.length < total && (
          <button
          disabled={loadingMore}
            className={ `flex mx-auto ${loadingMore? "bg-blue-300" : "bg-blue-500"} px-4 hover:bg-blue-600 py-2 text-white text-[20px] font-medium rounded-lg` }
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            {loadingMore ? (
              "Loading ..."
            ) : (
              <>
                {" "}
                Loadmore 
              </>
            )}
          </button>
        )}
</div>

</>
  )
}

export default ProductPage