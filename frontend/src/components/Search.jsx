import React, { useContext, useState } from 'react'
import { SearchContext } from '../Context/SearchContext'
import axios  from 'axios';
import {useNavigate} from "react-router-dom"

const Search = () => {
    const naviagate = useNavigate()
    const {search,setSearch}= useContext(SearchContext)
    const handleSubmit =async(e)=>{
        e.preventDefault()
        
   try {
     const {data} = await axios.get(`${import.meta.env.VITE_URL}/api/v1/product/search/${search.keyword}`)
     setSearch({...search, result:data})
     naviagate('/search')
   } catch (error) {
    
   }
    }
  return (
   <form  onSubmit={handleSubmit}>
    <input required autoCapitalize='none' autoComplete='off' autoCorrect='off'  value={search.keyword}  onChange={(e)=> setSearch({...search,keyword:e.target.value})} placeholder='Search' className=' px-1 outline-none border-2 rounded-lg py-1 w-[40vw] md:w-[27vw] mr-2' type="text" />
    <button type='submit' className=' px-2 py-1 md:px-4 md:py-1 bg-blue-500 text-white rounded-md '>Search</button>
  
   </form>
  )
}

export default Search