import React, { useContext, useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import axios from 'axios';

import { CartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PaymentForm = ({total,auth}) => {
  const navigate = useNavigate()
  const { cart,setCart } = useContext(CartContext);

 
  const stripe = useStripe();
  const elements = useElements();
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = async (e) => {
    
   e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      });

      if (error) {
        throw new Error(error.message);
      }

      // Send paymentMethod.id to your server
      const response= await axios.post(`${import.meta.env.VITE_URL}/api/v1/product/create-checkout-session`,{
        amount: total*100, // Amount in cents
        currency: 'usd', // Change to your currency
        paymentMethodId: paymentMethod.id,
        
      });
      toast.success('Payment Success')
      setCart([]);
      localStorage.removeItem("cart")
      setIsLoading(false)
      navigate(`/orders/${auth?.user?._id}`)
     await axios.post(`${import.meta.env.VITE_URL}/api/v1/order/create-order`,{
      products:cart,
      payment:total,
      buyer:auth.user._id
     })

      // Payment successful
      // Redirect to success page, show success message, etc.

    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <CardElement  className="p-3 border rounded-md focus:outline-none focus:border-blue-500" />
      {errorMessage && <div>{errorMessage}</div>}
      <button className={`${isLoading  ? 'bg-blue-200' :'bg-blue-500'} hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mx-auto flex mt-2`} type="submit" disabled={isLoading}>
        {isLoading ? 'Paying':"Pay Now"}
      </button>
    </form>
  )
}

export default PaymentForm
