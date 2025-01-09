import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Product from '../components/Product';
import LoaderLoader from "../components/LoaderLoader";
import { CartContext } from "../Context/CartContext";
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const [loader, setLoader] = useState(false);
  const { cart, setCart, addCartItem } = useContext(CartContext);
  const [product, setProduct] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const slug = useParams().slug;

  const getProductDetails = async () => {
    setLoader(true);
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/product/${slug}`);
      setProduct(data.product);
      setLoader(false);
      getSimilarProduct(data.product._id, data.product.category);
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [slug]);

  const getSimilarProduct = async (pid, cid) => {
    setLoader(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/api/v1/product/related-product/${pid}/${cid}`
      );
      setLoader(false);
      setRelatedProducts(data?.products);
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16">
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <LoaderLoader />
        </div>
      ) : (
        <div>
          <div className="pt-28 md:flex items-center gap-8">
            <div className="flex items-center justify-center w-full md:w-1/2">
              <img
                className="rounded-md border-2 bg-gray-50 border-transparent w-[90%] md:w-full md:max-w-md lg:max-w-lg"
                src={`${import.meta.env.VITE_URL}/download/${product.photo}`}
                alt={product.name || "Product"}
              />
            </div>
            <div className="mt-8 md:mt-0 md:w-1/2">
              <h1 className="text-2xl md:text-3xl font-semibold">
                {product.name}
              </h1>
              <p className="text-base md:text-lg mt-4">
                {product.description}
              </p>
              <h3 className="text-xl md:text-2xl font-medium mt-4">
                {product.price}$
              </h3>
              <div className="flex items-center gap-4 mt-6">
                <button
                  onClick={() => addCartItem(product)}
                  className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Add To Cart
                </button>
              </div>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-semibold underline mb-6">
                Similar Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((product) => (
                  <div key={product._id} className="flex justify-center">
                    <Product product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
