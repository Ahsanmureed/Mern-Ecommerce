import React from 'react'
import bg from "../assets/images/bg.png"
import ProductPage from './ProductPage'
import Categories from './Categories'
const Home = () => {
  return (
    <div className=' '>
    <div className='md:flex-row w-auto h-[95vh]  md:h-[100vh]    md:px-16    flex-col-reverse flex md:flex items-center gap-24 md:justify-between  bg-gray-50  md:pt-20'>
        <div>
            <h1 className=' text-[21px]  text-center'>#NEW SUMMER COLLECTION 20224</h1>
            <h1 className=' text-center  text-4xl md:text-7xl font-semibold'>ARRIVALS SALES</h1>
            <button className=' mb-3  uppercase mx-auto text-white py-2  mt-3  hover:transition hover:scale-95 hover:duration-150 px-4 rounded-md flex bg-black text-center'>Shop Now</button>
        </div>
        <img className='     w-[65%] md:h-[86vh] h-[45vh]  md:w-[31vw]   ' src={bg} alt="" />
        </div>
        <h1 className=' text-3xl font-poppins font-semibold mt-9 mb-0'>Categories:</h1>
        <Categories/>
        <h1 className=' text-3xl font-poppins font-semibold mt-20 mb-10'>Products:</h1>
        <ProductPage/>
    </div>
  )
}

export default Home