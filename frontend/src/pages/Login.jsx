import React, { useState } from 'react'
import logo from "../assets/images/logo.svg"
import { Link } from 'react-router-dom'
import axios from 'axios'
import {useNavigate,useLocation} from "react-router-dom"
import { useContext } from 'react'
import { AuthContext } from '../Context/UserContext'
const Login = () => {
    const Location = useLocation();
    const {auth,setAuth} = useContext(AuthContext)
    const navigate = useNavigate();
    const [inputs,setInputs]=useState({
        email:"",
        password:""
    })
    const  handleChange= (e)=>{
    setInputs({...inputs,[e.target.name]:e.target.value})
    }
    const handleSubmit =async(e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_URL}/api/v1/auth/login`,{
               email:inputs.email,
               password:inputs.password
            },{withCredentials:true})
           if(res.data.success){
            navigate(Location.state|| '/')
            setAuth({...auth,
            user:res.data.user,
        token:res.data.token})
        localStorage.setItem("auth",JSON.stringify(res.data))
           }
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className=' pt-44 md:pt-24 w-[100vw] flex flex-col items-center justify-center'>
        <img src={logo} alt="" />
      
            <h1 className=' md:text-2xl text-center text-[20px] mt-2 font-poppins font-medium'>Login to your account</h1>
            
        
        <form onSubmit={handleSubmit} className=' flex flex-col w-[85vw]  md:w-[30vw]'>
           
            <label className='mt-3'  htmlFor="email">Email:</label>
            <input onChange={handleChange} className=' mt-1 gap-2 border-2 outline-none rounded-md' type="email" name="email"  />
            <label className='mt-3' htmlFor="password">Password:</label>
            <input onChange={handleChange} name='password' className='mt-1 border-2 outline-none rounded-md' type="password" />
            <button type='submit' className=" mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Login</button>
            <h1 className=' mt-2 text-center'>Don't have an acoount? <Link className=' text-blue-700' to={"/register"}>Register</Link></h1>
        </form>
    </div>
  )
}

export default Login