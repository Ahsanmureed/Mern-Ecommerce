import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import toast from 'react-hot-toast';
const Register = () => {
    const navigate = useNavigate()
    const [inputs,setInputs]=useState({
        username:"",
        email:"",
        password:"",
        phone:"",
        address:""
    })
    const handleChange= (e)=>{
setInputs({...inputs,[e.target.name]:e.target.value})
    }
const handleSubmit =async (e)=>{
   e.preventDefault();
   try {
    const res =await axios.post("http://localhost:4000/api/v1/auth/register",{
        username:inputs.username,
        email:inputs.email,
        password:inputs.password,
        phone:inputs.phone,
        address:inputs.address
    },{withCredentials:true})
    if ( res.data.success) {
      toast.success(res.data.message)
      navigate("/login");
    }
    // } else  {
    //   toast.error("Error")
    // }
    
   } catch (error) {
    toast.error("User Already Registered")
   }
}
    
  return (
    <div className=" pt-44 md:pt-24 flex flex-col items-center justify-center">
      <img src={logo} alt="" />
     
        <h1 className=" md:text-2xl text-[20px] mt-2 font-poppins font-medium text-center">
          Create an Account
        
      </h1>
      <form onSubmit={handleSubmit} className=" flex flex-col w-[85vw]  md:w-[30vw]">
        <label className="mt-3" htmlFor="username">
          Username:
        </label>
        <input
        onChange={handleChange}
          className=" mt-1 gap-2 border-2 rounded-md outline-none"
          type="text"
          name="username"
        />
        <label className="mt-3" htmlFor="email">
          Email:
        </label>
        <input
        onChange={handleChange}
          className=" mt-1 gap-2 border-2 outline-none rounded-md"
          type="email"
          name="email"
        />
        <label className="mt-3" htmlFor="password">
          Password:
        </label>
        <input
        onChange={handleChange}
          className="mt-1 border-2 outline-none rounded-md"
          type="password"
          name="password"
        />
        <label className="mt-3" htmlFor="phone">
         Phone: 
        </label>
        <input
        onChange={handleChange}
          className="mt-1 border-2 outline-none rounded-md"
          type="number"
          name="phone"
        />
        
        <label className="mt-3" htmlFor="address">
          Address:
        </label>
        <input
        onChange={handleChange}
          className="mt-1 border-2 outline-none rounded-md"
          type="text"
          name="address"
        />
        <button
         type="submit"
          className=" mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Signup
        </button>
        <h1 className=" mt-2 text-center">
          Already have an acoount?{" "}
          <Link className=" text-blue-700" to={"/login"}>
            Login
          </Link>
        </h1>
      </form>
      
    </div>
    
  );
};

export default Register;
