import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/UserContext'
const UserPanel = () => {
  const {auth}= useContext(AuthContext)
  return (
    <div className="   text-2xl font-semibold w-40  h-[70vh] ">
    {/* Sidebar content */}
    <div className="p-4">
        <h1 className="text-2xl font-bold mb-4"></h1>
        {/* Sidebar links */}
        <ul className=' flex-col flex gap-3'>
        <Link to={`/dashboard/${auth?.user?._id}`}>Dashboard</Link>
      <Link to={`/orders/${auth?.user?._id}`}>My Orders</Link>
        </ul>
    </div>
</div>
  )
}

export default UserPanel
