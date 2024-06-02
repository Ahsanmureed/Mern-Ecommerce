import axios from 'axios';
import React, { useEffect, useState }   from 'react'

import { Link } from 'react-router-dom';
import LoaderLoader from '../components/LoaderLoader';

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const getCategories = async () => {
    setLoading(true)
        try {
          const { data } = await axios.get(`${import.meta.env.VITE_URL}/api/v1/category/get-all-category`);
          setLoading(false)
          setCategories(data?.category);
        } catch (error) {
            setLoading(false);
          console.log(error);
        }
      };
      useEffect(()=>{
getCategories();
      },[])

  return (
    <>
    
    {loading ? <LoaderLoader/> : <div className=' mt-10 mb-20'>
        <div className='    flex  text-center items-center md:gap-8 scrollbar-none  gap-9 overflow-auto md:overflow-hidden     px-1 md:px-6 '>
            {
                categories?.map((category)=>(
                  <Link to={`/category/${category.slug}`} className='cursor-pointer' key={category._id}>
                  <div className='w-24 h-24 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                      <img src={`${import.meta.env.VITE_URL}/download/${category.photo}`} alt={'Product Image'} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                  </div>
                  <p className='text-center text-base font-medium md:text-base capitalize'>{category.name}</p>
              </Link>
                ))
            }
        </div>
    </div>}
    </>
  )
}

export default Categories