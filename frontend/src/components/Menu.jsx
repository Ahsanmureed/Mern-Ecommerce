import React from 'react'
import { Link } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
import { useContext } from 'react'
import { AuthContext } from '../Context/UserContext'
const Menu = ({onclose}) => {
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
    <div className='absolute top-0   right-0 bg-gray-200   w-[80%] h-[100vh]'>
       <div className=' flex text-4xl mt-4  justify-end'> <IoCloseSharp onClick={onclose} /></div>
          <ul className=' flex items-center flex-col gap-20 text-2xl font-medium mt-28'>
       <Link onClick={onclose} to={'/'}><li className=' uppercase'>Home</li></Link>
      
         
       {auth.user?(<> <Link onClick={onclose} className=' uppercase' to={`/dashboard/${auth?.user._id}`}>Dashboard</Link> <Link onClick={onclose} className=' uppercase' to={`/orders/${auth?.user?._id}`}>My Orders</Link>  <Link onClick={onclose} to={"/login"}><li onClick={handleLogout} className=' uppercase'>Logout</li></Link></>):(<> <Link to={'/register'}><li className=' uppercase'>Register</li></Link>
     <Link onClick={onclose} to={'/login'}><li  className=' uppercase'>Login</li></Link></>)}
      </ul>
      
    </div>
  )
}

export default Menu