import React, { useState } from 'react'
import { IoMdClose } from "react-icons/io";

import axios from 'axios';
import OrderRole from './OrderRole';
const AdminChangeOrderStatus = ({ status,
  orderId,
  onClose,
  callFunc,}) => {

    const [orderStatus,setOrderStatus] = useState(status)
    const handleOnChangeSelect = (e) => {
      setOrderStatus(e.target.value)

      
  }

  const updateOrderStatus =async ()=>{
    const { data } = await axios.put(`${import.meta.env.VITE_URL}/api/v1/order/update-order/${orderId}`,{status:orderStatus})
    onClose();
    callFunc();
  }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50'>
       <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm'>

            <button className='block ml-auto' onClick={onClose}>
                <IoMdClose/>
            </button>

            <h1 className='pb-4 text-lg font-medium'>Change Order Status</h1>

             

            <div className='flex items-center justify-between my-4'>
                <p>Status :</p>  
                <select className='border px-4 py-1' value={orderStatus} onChange={handleOnChangeSelect}>
                    {
                        Object.values(OrderRole).map(el => {
                            return(
                                <option value={el} key={el}>{el}</option>
                            )
                        })
                    }
                </select>
            </div>


            <button className='w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700' onClick={updateOrderStatus}>Change Role</button>
       </div>
    </div>
  )
}

export default AdminChangeOrderStatus

