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
          <ul className=' flex items-center flex-col gap-20 text-2xl font-medium mt-44'>
       <Link to={'/'}><li className=' uppercase'>Home</li></Link>
      <Link to={'/categories'}><li className=' uppercase'>Categories</li></Link> 
         
       {auth.user?(<> <Link className=' uppercase' to={'/dashboard'}>Dashboard</Link>  <Link to={"/login"}><li onClick={handleLogout} className=' uppercase'>Logout</li></Link></>):(<> <Link to={'/register'}><li className=' uppercase'>Register</li></Link>
     <Link to={'/login'}><li className=' uppercase'>Login</li></Link></>)}
      </ul>
      
    </div>
  )
}

export default Menu