import React from 'react'
import bg from "../assets/images/bg.png"
import ProductPage from './ProductPage'
import Categories from './Categories'

const Home = () => {
  
  return (
    <div className=' '>
    <div className='md:flex-row w-auto h-[83vh]  md:h-[100vh]     md:px-16    flex-col-reverse flex md:flex items-center md:gap-24 gap-12 md:justify-between  bg-gray-50  md:pt-20'>
        <div>
            <h1 className=' text-[21px]  text-center'>#NEW SUMMER COLLECTION 20224</h1>
            <h1 className=' text-center  text-4xl md:text-7xl font-semibold'>ARRIVALS SALES</h1>
            <button className='  uppercase mx-auto text-white py-2  mt-3  hover:transition hover:scale-95 hover:duration-150 px-4 rounded-md flex bg-black text-center mb-5'>Shop Now</button>
        </div>
        <img className='     w-[65%] md:h-[86vh] h-[42vh]  md:w-[31vw]   ' src={bg} alt="" />
        </div>

        <div>
     
          
        </div>
        <h1 className=' text-3xl font-poppins font-semibold hh     mt-20 ' >Categories:</h1>
        <Categories />
        <h1 className=' text-3xl font-poppins font-semibold mt-16 mb-3 underline underline-offset-auto'>Products:</h1>
        <ProductPage/>
    </div>
  )
}

export default Home