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
        <div className='  grid grid-cols-2  md:grid-cols-3 px-6 md:px-28 gap-6 '>
            {
                categories?.map((category)=>(
                    <Link  key={category._id} to={`/category/${category.slug}`}><div className=' w-[40vw] md:w-[20vw] border-2 px-4 py-20 flex rounded-md bg-blue-500  text-white text-3xl font-poppins font-semibold    justify-center'><h1>{category.name}</h1></div></Link>
                ))
            }
        </div>
    </div>}
    </>
  )
}

export default Categories