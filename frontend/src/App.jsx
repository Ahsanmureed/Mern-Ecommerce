import React from 'react'
import NavBar from './components/NavBar'
import { Navigate } from "react-router-dom";
import Home from './pages/Home'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import About from './pages/About'
import Login from './pages/Login'
import Register from './pages/Register'
import { useContext } from 'react'
import { AuthContext } from './Context/UserContext'
import Dashboard from './User/Dashboard'
import ProtectedRoutes from './components/Routes/ProtectedRoutes';
import ProductDetails from "./pages/ProductDetails"
import Cart from './pages/Cart';
import SearchResult from './pages/SearchResult';

import Profile from './pages/Profile';
import Categories from './pages/Categories';
import Category from './pages/Category';

const App = () => {

  const {auth}= useContext(AuthContext)
  return (
    <div>  
   <BrowserRouter>
   <NavBar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={<Login/>}/>
   
    <Route path='/dashboard' element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}/>
    <Route path='/profile/:id' element={<ProtectedRoutes><Profile/></ProtectedRoutes>}/>
  
    <Route path='/product/:slug' element={<ProductDetails/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/category/:slug' element={<Category/>}/>
    <Route path='/categories' element={<Categories/>}/>
    <Route path='/search' element={<SearchResult/>}/>
    
    <Route path='/register' element={<Register/>}/>
    <Route path='/about' element={<About/>}/>
   </Routes>
   
   </BrowserRouter>
    </div>
 
  )
}

export default App