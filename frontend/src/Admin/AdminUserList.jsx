import React, { useEffect, useState } from 'react'
import AdminPanel from './AdminPanel'
import axios from 'axios'
import { MdModeEdit } from "react-icons/md";
import moment from "moment"
import AdminChangeRole from './AdminChangeRole';
const AdminUserList = () => {
  const [updateUserDetails,setUpdateUserDetails] = useState({
    email : "",
    username : "",
    role : "",
    _id  : ""
})
  const [openUpdateRole,setOpenUpdateRole] = useState(false)
  const [users,setUsers]= useState([])
  const fetchUsers = async()=>{
    const {data}= await axios.get(`${import.meta.env.VITE_URL}/api/v1/auth/get-users`)
    setUsers(data.data);
  }
  useEffect(()=>{
    fetchUsers()
  },[])
  return (
    <div className='mt-32 pr-10'>
  
   
   <div className=' flex   items-start  '>
      <AdminPanel/>

      <div className='bg-white pb-4'>
        <table className='w-[74vw] userTable '>
            <thead className='  '>
                <tr className='bg-black text-white   '>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody className=''>
                {
                    users.map((el,index) => {
                        return(
                            <tr className=' text-center  border-2 '>
                                <td>{index+1}</td>
                                <td>{el?.username}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('LL')}</td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white' 
                                    onClick={()=>{
                                        setUpdateUserDetails(el)
                                        setOpenUpdateRole(true)

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
            openUpdateRole && (
                <AdminChangeRole 
                    onClose={()=>setOpenUpdateRole(false)} 
                    name={updateUserDetails.username}
                    email={updateUserDetails.email}
                    role={updateUserDetails.role}
                    userId={updateUserDetails._id}
                    callFunc={fetchUsers}
                />
            )      
        }
    </div>



    </div></div>
  )
}

export default AdminUserList
