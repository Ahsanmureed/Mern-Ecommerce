import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/UserContext'
import { useParams } from 'react-router-dom'
import UserPanel from './UserPanel'
const UserOrders = () => {
  const id= useParams().id
  const {auth,setAuth}= useContext(AuthContext)
  const [orders,setOrders]= useState([])
  const userOrders = async()=>{
    const {data} = await axios.get(`${import.meta.env.VITE_URL}/api/v1/order/get-all-user-orders/${id}`)
setOrders(data.userOrder);
  }
  useEffect(()=>{
    userOrders()
  },[])

  return (
    <div className=' pt-28 flex items-start justify-center'>
     <div className=' hidden md:inline-block'> <UserPanel/></div>
      <table className=' w-full mx-1 md:mx-0  md:ml-[5vw] md:w-[76.2vw] '>
             <thead className='  '>
                 <tr className='bg-black text-white   '>
                     <th>Sr.</th>
                     <th>Products</th>
                     <th>Address</th>
                     <th>Payment</th>
                    
                     <th >Status</th>
                  
                 </tr>
             </thead>
             <tbody className=''>
                 {
                     orders.map((el,index) => {
                         return(
                             <tr className=' text-center  border-2 '>
                                 <td>{index+1}</td>
                                 <td>{el.products.map((product)=>(
                                  <h1>{product.name}</h1>
                     ))}</td>
                                 
                                 <td>{el?.buyer.address}</td>
                                <td>{el.payment}$</td>
                               
                                 <td >{el.status}</td>
                                
                             </tr>
                         )
                     })
                 }
             </tbody>
         </table>
    </div>
  )
}

export default UserOrders
