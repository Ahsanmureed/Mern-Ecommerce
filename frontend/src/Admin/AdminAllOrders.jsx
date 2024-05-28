import React, { useEffect, useState } from 'react'
import AdminPanel from './AdminPanel'
import { MdModeEdit } from "react-icons/md";
import moment from 'moment';
import axios from 'axios';
import AdminChangeOrderStatus from './AdminChangeOrderStatus';
import LoaderLoader from '../components/LoaderLoader';
const AdminAllOrders = () => {
    const [loader,setLoader]=useState(false)
    const [updateOrderStatus,setupdateOrderStatus] = useState({
        status:'', 
        _id  : ""
    })
      const [openUpdateStatus,setopenUpdateStatus] = useState(false)
  const [orders,setOrders]=useState([])
  const adminAllOrders = async()=>{
    try {
        setLoader(true)
        const {data}= await axios.get(`${import.meta.env.VITE_URL}/api/v1/order/get-all-orders`)
        setLoader(false)
    setOrders(data.orders)
 
    } catch (error) {
        setLoader(false)
    }
  }
  useEffect(()=>{
   adminAllOrders()
  },[])

  return (
    <div className='mt-32 pr-10'>
  
   {
    loader ? <LoaderLoader/> :<><div className=' flex   items-start  '>
    <AdminPanel/>

    <div className='bg-white pb-4'>
      <table className='w-[74vw]  '>
          <thead className='  '>
              <tr className='bg-black text-white   '>
                  <th>Sr.</th>
                  <th>Products</th>
                  <th>User</th>
                  <th>Address</th>
                  <th>Payment</th>
                  <th>Created Date</th>
                  <th>Status</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody className=''>
              {
                  orders.map((el,index) => {
                      return(
                          <tr className=' text-center  border-2 '>
                              <td>{index+1}</td>
                              <td>{el.products.map((product)=>(
                               <h1>{product.name}{product.qty}</h1>
                  ))}</td>
                              <td>{el?.buyer.email}</td>
                              <td>{el?.buyer.address}</td>
                             <td>{el.payment}$</td>
                              <td>{moment(el?.createdAt).format('LL')}</td>
                              <td>{el.status}</td>
                              <td>
                                  <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                                  onClick={()=>{
                                      setupdateOrderStatus(el)
                                      setopenUpdateStatus(true)

                                  }}
                                  >
                                      <MdModeEdit/>
                                  </button>
                              </td>
                          </tr>
                      )
                  })
              }
          </tbody>
      </table>

      {
          openUpdateStatus && (
              <AdminChangeOrderStatus
                  onClose={()=>setopenUpdateStatus(false)} 
                 
                  status={updateOrderStatus.status}
                  orderId= {updateOrderStatus._id}
                  
                  callFunc={adminAllOrders}
              />
          )      
      }
  </div>



  </div></>
   }
    </div>
  )
}

export default AdminAllOrders
