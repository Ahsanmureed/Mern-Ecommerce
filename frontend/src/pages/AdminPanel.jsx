import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AuthContext } from '../Context/UserContext'

const AdminPanel = () => {
  const {auth,setAuth} = useContext(AuthContext)
  return (
   <div className=' flex flex-col w-72 p-4 text-2xl text-center mt-8 font-medium pr-11'> 

<Link to={"/admin/panel/all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                        <Link to={"/admin/panel/all-prodcuts"} className='px-2 py-1 hover:bg-slate-100'>All product</Link>
                        <Link to={"/admin/panel/all-categories"} className='px-2 py-1 hover:bg-slate-100'>All Categories</Link>
                        

   </div>
  )
}

export default AdminPanel
