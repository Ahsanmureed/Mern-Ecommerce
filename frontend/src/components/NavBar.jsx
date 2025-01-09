import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IoMenu } from "react-icons/io5";

import axios from "axios";
import { IoCloseSharp } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { Toaster } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Menu from "./Menu";
import logo from "../assets/images/logo.svg";
import { useContext } from "react";
import { AuthContext } from "../Context/UserContext";
import { Badge } from "antd";
import { CartContext } from "../Context/CartContext";

const NavBar = () => {
  const navigate = useNavigate();
  const [loading,setLoading]= useState(false)
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)
  const handleChange = async (e) => {
    
  
  const { value } = e.target
  setSearch(value)
    
    
    
  };
const handleSubmit =(e)=>{
  
  e.preventDefault()
  if(search !== ""){
    navigate(`/search?q=${search}`)
  }
  else{
    navigate("/")
  }
 
}
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((acc,item)=>{
       return acc + item.qty
   
  },0)
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
    });
    toast.success("Logout Successfully");
    localStorage.clear("auth");
  };
 

  
  return (
    <div>
      <Toaster />
      <nav className=" flex items-center  h-16 shadow-md  pl-2 md:px-1 justify-between fixed w-full top-0 bg-white z-10">
        <div>
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
        </div>

        <ul className=" md:flex hidden items-center gap-8 text-[21px] font-poppins ">
          <div>
            <form onSubmit={handleSubmit} className=" block" >
              <input
                
                value={search}
                onChange={
                  handleChange
                }
                placeholder="Search"
                className=" px-1 outline-none border-2 rounded-lg py-1 w-[25vw] mr-2"
                type="text"
              />
              <button
              disabled={loading}
                type="submit"
                className={` ${loading ? "bg-blue-700" :"bg-blue-500" } px-4 py-1  text-white rounded-md `}
              >
                Search
              </button>
            </form>
          </div>
          <Link className="flex " to={"/"}>
            Home
          </Link>
          

          {auth?.user ? (
            <>
              <Link to={"/login"} className="flex " onClick={handleLogout}>
                Logout
              </Link>{" "}
              <Link to={`/dashboard/${auth?.user?._id}`} className="flex  ">
                Dashboard
              </Link>
            </>
          ) : (
            <>
              <Link className=":flex  " to={"/register"}>
                Singup
              </Link>
              <Link className="flex  " to={"/login"}>
                Login
              </Link>
            </>
          )}
          {auth?.user?.role === 1 && (
            <Link to={"/admin/panel/all-prodcuts"}>Admin Panel</Link>
          )}
          <Link className="  flex " to={"/cart"}>
            <FaShoppingCart className=" mr-3" />
            <div className=" absolute top-[-2%]  right-[5px]">
              <Badge count={totalItems} showZero></Badge>
            </div>
          </Link>
        </ul>
        <div className=" text-2xl flex items-center md:hidden gap-2">
          <div className=" ">
            <IoIosSearch
              className="  text-3xl"
              onClick={() => setSearchOpen(!searchOpen)}
            />
            {searchOpen && (
              <form  onSubmit={handleSubmit}
                className="  duration-500 fixed left-0 px-2 items-center justify-center top-0 right-0 w-screen bg-gray-100  py-4 z-30 [h-10vh] "
                
              >
                <input
                  
                 
                  value={search}
                  onChange={handleChange
                    
                  }
                  placeholder="Search"
                  className=" px-1 font-medium  outline-none border-2 rounded-md py-[5px] w-[60vw] md:w-[27vw] mr-2"
                  type="text"
                />
                <button
                  type="submit"
                  className=" text-center px-[10px] py-[4.5px] md:px-4 md:py-1 bg-blue-500 text-white rounded-md "
                >
                  Search
                </button>
                <IoCloseSharp
                  onClick={() => setSearchOpen(!searchOpen)}
                  className=" absolute right-0 top-5 text-4xl"
                />
              </form>
            )}
          </div>

          <Link className="   flex " to={"/cart"}>
            <FaShoppingCart className=" mr-3" />
            <div className=" absolute top-0  right-[26px] md:top-0  md:right-1.5">
              <Badge count={totalItems} showZero></Badge>
            </div>
          </Link>

          <div className=" md:hidden text-2xl" >
            <IoMenu onClick={()=> setMenu(true)} className=" md:hidden" />
            {menu ? <Menu isOpen={menu}   onclose={()=> setMenu(false)}/>: ""}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
