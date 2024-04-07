import React, { useContext } from 'react'
import { SearchContext } from '../Context/SearchContext'
import Product from '../components/Product'

const SearchResult = () => {
    const {search,setSearch}= useContext(SearchContext)
    console.log(search);
  return (
    <div className='pt-24 '><h1 className=' text-center  text-3xl font-poppins font-bold'>{search?.result <1 ? "No Products Found":`found ${search.result.length} Products`}</h1>
    <div className=' md:grid md:grid-cols-3'>
    {search?.result?.map((product)=>  (
     <div className='  flex items-center justify-center'><Product product={product}/></div>
      ))}
    </div>
      
    </div>
  )
}

export default SearchResult