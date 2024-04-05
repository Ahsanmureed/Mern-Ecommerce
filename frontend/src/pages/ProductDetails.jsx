import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Product from '../components/Product'
const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const slug = useParams().slug;
  const getProductDetails = async () => {
   try {
    const res = await axios.get("https://mern-ecommerce-63lm.vercel.app/api/v1/product/" + slug);
    setProduct(res.data.product);
    getSimilarProduct(res.data?.product._id, res.data?.product.category._id);
   } catch (error) {
    
   }
  };
  useEffect(() => {
    getProductDetails();
  }, []);

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `https://mern-ecommerce-63lm.vercel.app/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div>
      <div className=" pt-28 px-12 md:flex items-center  md:justify-between ">
      <div>
        <img className=" rounded-md" src={product.photo} alt="" />
      </div>
      <div className=" md:w-[57vw] mt-9 md:mt-0 ">
        <h1 className=" text-3xl font-poppins font-semibold">
          {product.name}
        </h1>
        <p className=" text-[20px] mt-5">
         {product.description}
        </p>
        <h3 className=" text-2xl  font-medium">{product.price}$</h3>
        <div className="flex items-center gap-4 mt-4">
          {" "}
          <button className=" text-2xl border-2  items-center justify-center py-1 px-2 ">
            +
          </button>
          <span className="text-2xl">0</span>
          <button className=" text-2xl  border-2  items-center justify-center py-1 px-2.5">
            -
          </button>
          <button className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
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
      
      <Product product={product}/>
    ))}
</div>
</div>: ""}
    </div>
  );
};

export default ProductDetails;
