import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Product from '../components/Product'
import LoaderLoader from "../components/LoaderLoader"
import { CartContext } from "../Context/CartContext";
import toast from 'react-hot-toast';
const ProductDetails = () => {
  const [loader,setLoader]=useState(false)
  const {cart,setCart,addCartItem}= useContext(CartContext)
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const slug = useParams().slug;
  const getProductDetails = async () => {
    setLoader(true)
   try {
    const res = await axios.get(`${import.meta.env.VITE_URL}/api/v1/product//product/${slug}`);
    setProduct(res.data.product);
    setLoader(false)
    getSimilarProduct(res.data?.product._id, res.data?.product.category._id);
   } catch (error) {
    
   }
  };
  useEffect(() => {
    getProductDetails();
  }, [slug]);

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    setLoader(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/product/related-product/${pid}/${cid}`
      );
      setLoader(false)
      setRelatedProducts(data?.products);
    } catch (error) {
      setLoader(false)
      console.log(error);
    }
  };
  
  return (
   <div>

    {loader ? <div className="h-[80vh] flex justify-center items-center w-full"><LoaderLoader/></div>:  <div>
      <div className=" pt-28 md:flex items-center  md:px-8 ">
      <div>
        <img className=" px-8 rounded-md  md:w-[60vh] md:h-[70vh]" src={`http://localhost:4000/download/${product.photo}`} alt="" />
      </div>
      <div className=" md:w-[57vw]  px-8 w-[90vw] mt-9 md:mt-0 ">
        <h1 className=" text-3xl font-poppins font-semibold">
          {product.name}
        </h1>
        <p className=" text-[20px] mt-5">
         {product.description}
        </p>
        <h3 className=" text-2xl  font-medium">{product.price}$</h3>
        <div className="flex items-center gap-4 mt-4">
          {" "}
         
          <button onClick={()=> addCartItem(product)} className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Add To Cart
          </button>
        </div>
      </div>
      
    </div>
    {relatedProducts.length >0 ? <div>
    <h1 className=" text-3xl mt-10 mb-5 font-semibold">Similar Products</h1>
    
    <div className=" md:grid grid-cols-3">
    {relatedProducts?.map((product)=>(
      
      <div className='  flex items-center justify-center'><Product key={product._id} product={product}/></div>
    ))}
</div>
</div>: ""}
    </div>}
   </div>
  );
};

export default ProductDetails;
