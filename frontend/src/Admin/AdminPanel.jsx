import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { AuthContext } from '../Context/UserContext'

const AdminPanel = () => {
  const {auth,setAuth} = useContext(AuthContext)
  return (
    <div className='min-h-[calc(100vh-120px)] w-[20%]   font-poppins font-semibold text-center md:flex hidden'>

    <aside className='bg-white min-h-full  w-full  max-w-60 customShadow'>
            

             {/***navigation */}       
            <div>   
                <nav className='grid p-4 gap-2'>
                <Link to={"/admin/panel/all-users"} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
<Link to={"/admin/panel/all-orders"} className='px-2 py-1 hover:bg-slate-100'>All Orders</Link>
                        <Link to={"/admin/panel/all-prodcuts"} className='px-2 py-1 hover:bg-slate-100'>All product</Link>
                        <Link to={"/admin/panel/all-categories"} className='px-2 py-1 hover:bg-slate-100'>All Categories</Link>
                </nav>
            </div>  
    </aside>

    <main className='w-full h-full p-2'>
        <Outlet/>
    </main>
</div>
  )
}

export default AdminPanel
