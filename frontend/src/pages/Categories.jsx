import React from 'react'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories= useCategory()
   
  return (
    <div className=' mt-24'>
        <div className='  grid grid-cols-2  md:grid-cols-3 px-12 md:px-28 gap-6 '>
            {
                categories?.map((category)=>(
                    <Link  key={category._id} to={`/category/${category.slug}`}><div className=' w-[40vw] md:w-[20vw] border-2 px-4 py-20 flex rounded-md bg-blue-500  text-white text-3xl font-poppins font-semibold    justify-center'><h1>{category.name}</h1></div></Link>
                ))
            }
        </div>
    </div>
  )
}

export default Categories