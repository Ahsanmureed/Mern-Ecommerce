import React from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { SearchContext } from '../Context/SearchContext'
import axios  from 'axios';
import { IoCloseSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import  { Toaster } from 'react-hot-toast';
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import toast from 'react-hot-toast';
import Menu from "./Menu";
import logo from "../assets/images/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../Context/UserContext";
import { Badge } from "antd";
import { CartContext } from "../Context/CartContext";


const NavBar = () => {
  const navigate =useNavigate()
  const {search,setSearch}= useContext(SearchContext)
  const handleSubmit =async(e)=>{
      e.preventDefault()
      
 try {
   const {data} = await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/search/${search.keyword}`)
   setSearch({...search, result:data})
   navigate('/search')
 } catch (error) {
  
 }
  }
  
  const { cart } = useContext(CartContext);
  const { auth, setAuth } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const showMenu = () => {
    setMenu(!menu);
  };
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    })
    toast.success("Logout Successfully")
    localStorage.clear("auth")
    
  };
  return (
<div>
<Toaster />
  <nav className=" flex items-center shadow-md h-16 pl-2 md:px-3 justify-between fixed w-full top-0 bg-white z-10">

<div><Link to={'/'}><img src={logo}  alt="" /></Link></div>

<ul className=" md:flex hidden items-center gap-8 text-[21px] font-poppins ">
<div><form className=" block" onSubmit={handleSubmit}>
    <input required autoCapitalize='none' autoComplete='off' autoCorrect='off'  value={search.keyword}  onChange={(e)=> setSearch({...search,keyword:e.target.value})} placeholder='Search' className=' px-1 outline-none border-2 rounded-lg py-1 w-[25vw] mr-2' type="text" />
    <button type='submit' className='  px-4 py-1 bg-blue-500 text-white rounded-md '>Search</button>
  
   </form></div>
<Link className="flex " to={'/'}>Home</Link>
<Link  className="flex "  to={'/categories'}>Categories</Link>

{auth?.user?<><Link to={"/login"} className="flex "  onClick={handleLogout}>Logout</Link> <Link to={'/dashboard'} className="flex  " >Dashboard</Link></> :<><Link className=":flex  "  to={'/register'}>Singup</Link>
<Link className="flex  "  to={'/login'}>Login</Link></> }
<Link  className="  flex " to={"/cart"}>
  <FaShoppingCart className=" mr-3" />
  <div className=" absolute top-0  right-[10px]"><Badge
      
      count={cart?.length}
      showZero
    >
      
    </Badge></div>
    
  </Link>

  
</ul>
<div className=" text-2xl flex items-center md:hidden gap-2">
  <div className=" ">
  <IoIosSearch className="  text-3xl" onClick={()=>setSearchOpen(!searchOpen)}/>
{searchOpen &&  <form className=" duration-1000 ease-in-out  fixed left-0 items-center justify-center top-0 right-0 w-screen bg-gray-100 pl-1 pr-0  py-4 z-30 [h-10vh] " onSubmit={handleSubmit}>
    <input required autoCapitalize='none' autoComplete='off' autoCorrect='off'  value={search.keyword}  onChange={(e)=> setSearch({...search,keyword:e.target.value})} placeholder='Search' className=' px-1 font-medium  outline-none border-2 rounded-md py-2 w-[60vw] md:w-[27vw] mr-2' type="text" />
    <button type='submit' className=' text-center px-3 py-[6.7px] md:px-4 md:py-1 bg-blue-500 text-white rounded-md '>Search</button>
    <IoCloseSharp onClick={()=> setSearchOpen(!searchOpen)} className=" absolute right-0 top-6 text-4xl"/>
  
   </form>}
  </div>

  <Link  className="   flex " to={"/cart"}>
  <FaShoppingCart className=" mr-3" />
  <div className=" absolute top-0  right-[26px] md:top-0  md:right-1.5"><Badge
      
      count={cart?.length}
      showZero
    >
      
    </Badge></div>
    
  </Link>
  
  <div className=" md:hidden text-2xl" onClick={showMenu}>
      <IoMenu className="md:hidden" />
      {menu && <Menu />}
    </div>
    
    
    </div>

    
</nav></div>
  );
};

export default NavBar;
