import React, { useContext, useEffect, useState } from 'react'

import {AuthContext} from "../Context/UserContext"
import axios from "axios"
import toast from 'react-hot-toast';
import {useParams} from "react-router-dom"
const Profile = () => {
  const id= useParams().id;
    const {auth,setAuth}= useContext(AuthContext)
  
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    
 //get user data
 useEffect(() => {
    const email = auth?.user?.email
    const name = auth?.user?.username
    const phone = auth?.user?.phone
    const address = auth?.user?.address
    setUsername(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);


   
    const update= async(e)=>{
     e.preventDefault();
         try {
      const { data } = await axios.put(`${import.meta.env.VITE_URL}/api/v1/auth/updateUser/${id}`, {
        username,
        email,
        password,
        phone,
        address,
      });
      if (data?.errro) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
    
  return (
    <div className='pt-28 md:px-10 flex gap-20'>
     
        <div className='md:w-[70vw] w-[95vw]  md:h-[75vh] '>
            <h1 className=' text-center text-3xl font-poppins font-normal uppercase'>User Profile</h1>
              <form className='gap-3 w-[95vw] md:w-[30vw] border-2  py-10 px-14 mx-auto mt-4 text-center  flex flex-col' onSubmit={update}>
                <input  onChange={(e) => setUsername(e.target.value)} className=' border-2 py-1' value={username} type="text" name='username' />
                <input onChange={(e) => setEmail(e.target.value)} className=' border-2 py-1' value={email} type="email" name="email" id="" />
                <input placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} className=' border-2 py-1'  type="password" value={password} name="password" id="" />
                <input onChange={(e) => setPhone(e.target.value)} className=' border-2 py-1' value={phone} type="text" name="phone" id="" />
                <input  onChange={(e) => setAddress(e.target.value)} className=' border-2 py-1' value={address} type="text"  name="address" id="" />
                <button type='submit' className=' bg-blue-500 text-white px-3 py-2 font-semibold'>Update Profile</button>
              </form>
        </div></div>
  )
}

export default Profile