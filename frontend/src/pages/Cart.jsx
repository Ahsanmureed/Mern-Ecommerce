import React, { useContext,useEffect, useState } from "react";
import { AuthContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";
import {useNavigate} from "react-router-dom"
import DropIn from "braintree-web-drop-in-react";
import toast from 'react-hot-toast';
import axios from "axios"
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import PaymentForm from "../components/PaymentForm"
const Cart = () => {
  const stripePromise = loadStripe(import.meta.env.SRIPE_KEY);
  const { cart, setCart ,increaseCartItemQuantity,decreaseCartItemQuantity,removeCartItem} = useContext(CartContext);
  const { auth,setAuth } = useContext(AuthContext);
 
  const navigate= useNavigate()
  let totalPrice = cart.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );

  const cents= ()=>{
   return totalPrice*100
  }
  const totalQty = cart.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );




 


 
  return (
    <div className=" mt-24">
      <div className=" text-center text-2xl">
        <h1 className=" font-semibold">
          {auth?.user ? `Hello ${auth.user.username}` : ""}
        </h1>

        <p className="text-center mb-7">
          {cart?.length
            ? `You Have ${cart.length} items in your cart ${
                auth?.token ? "" : "please login to checkout !"
              }`
            : " Your Cart Is Empty"}
        </p>
      </div>
      <div className=" flex md:flex-row flex-col md:px-7 px-3  items-start   md:gap-40 ">
        <div>
          {cart?.map((product) => (
            <div className="  border-2 rounded-md md:w-[50vw] w-[95vw]  py-2 flex items-center md:gap-12 gap-6 mb-4">
              <img className=" w-36" src={`${import.meta.env.VITE_URL}/download/${product.photo}`} alt="" />
              <div>
                {" "}
                <h1 className="mb-1 text-2xl font-semibold">{product.name.substring(0,30)}</h1>
                <p className=" mb-1">{product.description.substring(0,40)}..</p>
                <h3 className=" mb-2 font-medium">{product.price}$</h3>

                <div className=" flex gap-2 mb-3">
                <button className=" border-2 px-1.5 flex items-center justify-center text-center"  onClick={()=> decreaseCartItemQuantity(product._id)}>-</button>
                <h1>{product.qty}</h1>
                <button className=" border-2 px-1.5 flex items-center justify-center text-center" onClick={()=> increaseCartItemQuantity(product._id)}>+</button>

                </div>
                <button
                  onClick={() => removeCartItem(product._id)}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                  Remove
                </button>
                
                
                {" "}
              </div>
            </div>
          ))}
        </div>
        <div className={` flex flex-col ${cart?.length === 0  ? 'mx-[24.5vw]' : ""} `} >
          <h1 className=" mt-5 text-3xl font-semibold text-center">
            Cart Summary
          </h1>
          <h1 className=" text-2xl text-center mt-2">Total | Checkout | Payment</h1>
          <hr className=" mt-2" />
          <h3 className=" text-center text-2xl font-medium mt-3">
            Total: {totalPrice}$
          </h3>
          {auth?.user?.address ? (
                <>
                  <div className="mb-3 text-center text-[20px]">
                    <h4 className=" text-2xl font-semibold font-poppins">Current Address:</h4>
                    <h5 className=" text-[20px] font-medium">{auth?.user?.address}</h5>
                    <button
                      className=" bg-blue-500 text-white mb-1  px-2 mt-2 py-1 rounded-md"
                      onClick={() => navigate(`/dashboard/${auth?.user?._id}`)}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                   ""
                  ) : (
                    <button
                      className= "bg-yellow-400 items-center flex mx-auto px-3 text-[17px] py-2 rounded-md mt-2  font-semibold"
                      onClick={() =>
                        navigate("/login", {
                          state: "/cart",
                        })
                      }
                    >
                      Plase Login to checkout
                    </button>
                  )}
                </div>
              )}
             {
              cart?.length <1 ? "": <Elements total={totalPrice} auth={auth} stripe={stripePromise}>

                <PaymentForm auth={auth} total={totalPrice}/>
              </Elements>
             }
        </div>
      </div>
    </div>
  );
};

export default Cart;
