import React, { useContext,useEffect, useState } from "react";
import { AuthContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";
import {useNavigate} from "react-router-dom"
import DropIn from "braintree-web-drop-in-react";
import axios from "axios"
const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const { auth,setAuth } = useContext(AuthContext);
  const [clientToken,setClientToken]= useState('');
  const [instance, setInstance] = useState("");
 const [loading, setLoading] = useState(false);
  const navigate= useNavigate()
  const totalPrice = () => {
  

    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

 
  const removeItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

 //get payment gateway token
 const getToken = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/braintree/token`);
    setClientToken(data?.clientToken);
  } catch (error) {
    console.log(error);
  }
};

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/v1/product/braintree/payment`, {
        nonce,
        cart,
        auth
       
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      // toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  console.log(cart);
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
              <img className=" w-36" src={product.photo} alt="" />
              <div>
                {" "}
                <h1 className="mb-1 text-2xl font-semibold">{product.name}</h1>
                <p className=" mb-1">{product.description.substring(0, 30)}</p>
                <h3 className=" mb-2 font-medium">{product.price}$</h3>
                <button
                  onClick={() => removeItem(product._id)}
                  className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
                >
                  Remove
                </button>{" "}
              </div>
            </div>
          ))}
        </div>
        <div className="">
          <h1 className=" mt-5 text-3xl font-semibold text-center">
            Cart Summary
          </h1>
          <h1 className=" text-2xl text-center mt-2">Total | Checkout | Payment</h1>
          <hr className=" mt-2" />
          <h3 className=" text-center text-2xl font-medium mt-3">
            Total: {totalPrice()}
          </h3>
          {auth?.user?.address ? (
                <>
                  <div className="mb-3 text-center text-[20px]">
                    <h4 className=" text-2xl font-semibold font-poppins">Current Address:</h4>
                    <h5 className=" text-[20px] font-medium">{auth?.user?.address}</h5>
                    <button
                      className=" bg-blue-500 text-white mb-1  px-2 mt-2 py-1 rounded-md"
                      onClick={() => navigate("/dashboard/user/profile")}
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
              <div className=" mr-[4px]">
                {!clientToken || !auth?.token || !cart?.length ? (
                  ""
                ) : (
                  <div className=" md:w-[28vw] w-[97.2vw]">
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />

                    <button
                      className=" bg-blue-500 px-3 py-2 text-[18px] mt-3 mb-2 text-white rounded-md flex mx-auto"
                      onClick={handlePayment}
                      disabled={loading || !instance || !auth?.user?.address}
                    >
                      {loading ? "Processing ...." : "Make Payment"}
                    </button>
                  </div>
                )}
                </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
