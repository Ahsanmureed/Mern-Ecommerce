import React from "react";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

import { FaShoppingCart } from "react-icons/fa";
import  { Toaster } from 'react-hot-toast';
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import Menu from "./Menu";
import logo from "../assets/images/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../Context/UserContext";
import { Badge } from "antd";
import { CartContext } from "../Context/CartContext";
import Search from "./Search";

const NavBar = () => {
  const navigate =useNavigate()
  const { cart } = useContext(CartContext);
  const { auth, setAuth } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);

  const showMenu = () => {
    setMenu(!menu);
  };
  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    })
    localStorage.clear("auth")
    
  };
  return (
<div>
<Toaster />
  <nav className=" flex items-center shadow-md h-16 pl-2 md:px-6 justify-between fixed w-full top-0 bg-white z-10">

<div><Link to={'/'}><img src={logo}  alt="" /></Link></div>
<div><Search/></div>
<ul className=" md:flex items-center gap-8 text-[21px] font-poppins ">

<Link className="hidden md:flex " to={'/'}>Home</Link>
<Link  className="hidden  md:flex "  to={'/categories'}>Categories</Link>

{auth?.user?<><Link to={"/login"} className="hidden md:flex "  onClick={handleLogout}>Logout</Link> <Link to={'/dashboard'} className="hidden md:flex  " >Dashboard</Link></> :<><Link className="hidden md:flex  "  to={'/register'}>Singup</Link>
<Link className="hidden md:flex  "  to={'/login'}>Login</Link></> }
<Link  className="  flex " to={"/cart"}>
  <FaShoppingCart />
  <div className=" absolute top-0  right-[19px] md:top-0  md:right-1.5"><Badge
      
      count={cart?.length}
      showZero
    >
      
    </Badge></div>
    
  </Link>
  
</ul>
<div className=" md:hidden text-2xl" onClick={showMenu}>
      <IoMenu className="md:hidden" />
      {menu && <Menu />}
    </div>
    
</nav></div>
  );
};

export default NavBar;
