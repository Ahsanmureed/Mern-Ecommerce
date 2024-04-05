import React from 'react'
import { Link } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import { useContext } from 'react'
import { AuthContext } from '../Context/UserContext'
const Menu = () => {
  const handleLogout =()=>{
    setAuth({
      ...auth,
      user:null,
      token:''
    })
    localStorage.clear("auth")
  }
     
  const {auth,setAuth} = useContext(AuthContext)
  return (
    <div className='absolute top-0  right-0 bg-gray-200 duration-200 w-[80%] h-[100vh]'>
       <div className=' flex text-4xl mt-4  justify-end'> <IoCloseSharp /></div>
          <ul className=' flex items-center flex-col gap-12 text-2xl font-medium mt-36'>
       <li className=' uppercase'>Home</li>
       <li className=' uppercase'>Categories</li>
       <li className=' uppercase'>Shop</li>
       <li className=' uppercase'>Contact</li>
       {auth.user?(<><Link to={"/login"}><li onClick={handleLogout} className=' uppercase'>Logout</li></Link></>):(<> <Link><li className=' uppercase'>Register</li></Link>
     <Link><li className=' uppercase'>Login</li></Link></>)}
      </ul>
      
    </div>
  )
}

export default Menu