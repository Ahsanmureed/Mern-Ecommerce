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
    {loading ? <LoaderLoader/> : <div className=' mt-24'>
        <div className='    flex items-center text-center gap-6 '>
            {
                categories?.map((category)=>(
                    <div className='        font-poppins font-semibold    '><Link  key={category._id} to={`/category/${category.slug}`}><img className='w-28 rounded-full border-2 border-transparent bg-gray-100' src={`${import.meta.env.VITE_URL}/download/${category.photo}`} alt="" /></Link><h1>{category.name}</h1></div>
                ))
            }
        </div>
    </div>}
    </>
  )
}

export default Categories