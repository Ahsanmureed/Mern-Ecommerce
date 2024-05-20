import React, { useEffect, useState } from 'react'
import AdminCreateCategory from './AdminCreateCategory'
import AdminPanel from './AdminPanel'
import axios from 'axios'
import AdminCategoryCard from './AdminCategoryCard'

const AdminCategories = () => {
  const [createCategory,setCreateCategory]=useState(false)
  const [categories,setCategories]=useState([])
  const fetchCategories= async  ()=>{
    const {data}= await axios.get(`${import.meta.env.VITE_URL}/api/v1/category/get-all-category`)
    setCategories(data.category);
  }
  useEffect(()=>{
    fetchCategories();
  },[])
  return (
    <div className=' mt-20 pr-20 '>
      
      <div  className=' flex items-end justify-end'><button onClick={()=>setCreateCategory(true)} className='  py-1 px-2 rounded-md text-white text-[20px] font-medium mb-4 bg-blue-500 overflow-hidden   '  >Create Category</button></div>
   {createCategory ? <AdminCreateCategory fetchCat= {fetchCategories}  onClose={()=>setCreateCategory(false)}/> : ""}
<div className='flex   items-start'> 
    <AdminPanel/>
    <div className=' grid grid-cols-4 gap-5'>

    {

categories?.map((cat)=> { 
  return (
    <AdminCategoryCard fetchCat={fetchCategories}  cat={cat}/>
  )
})
}
    </div>
    </div>
    </div>
  )
}

export default AdminCategories
