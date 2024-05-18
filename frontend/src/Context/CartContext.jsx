import { createContext, useEffect, useState } from "react";
export const CartContext = createContext();
import toast from 'react-hot-toast';
export const CartProvider = ({children})=>{
const [cart,setCart]= useState([])

const updateCart = (newCart) => {
  setCart(newCart);
  localStorage.setItem('cart', JSON.stringify(newCart));
};

const addCartItem = (item) => {
  const check = cart.some((el) => el._id === item._id);
  if (check) {
    toast.error("Already Item in Cart");
  } else {
    toast.success("Item Add successfully");
    const updatedCart = [
      ...cart,
      { ...item, qty: 1, total: item.price },
    ];
    updateCart(updatedCart);
  }
};

const removeCartItem = (itemId) => {
  const updatedCart = cart.filter((item) => item._id !== itemId);
  updateCart(updatedCart);
  localStorage.removeItem('cart'); 
};;

  const increaseCartItemQuantity = (itemId) => {
    const updatedCart = cart.map((item) =>
      item._id === itemId ? { ...item, qty: item.qty + 1, total: item.total + item.price } : item
    );
    updateCart(updatedCart);
  };

  const decreaseCartItemQuantity = (itemId) => {
    const updatedCart = cart.map((item) =>
      item._id === itemId && item.qty > 1
        ? { ...item, qty: item.qty - 1, total: item.total - item.price }
        : item
    );
    updateCart(updatedCart);
  };
useEffect(()=>{
    const existingCart = localStorage.getItem("cart");
    if(existingCart){
        setCart(JSON.parse(existingCart))
    }
},[])

    return (
        <CartContext.Provider value={{cart,setCart,addCartItem,removeCartItem,increaseCartItemQuantity,decreaseCartItemQuantity}}>
            {children}
        </CartContext.Provider>
    )
}