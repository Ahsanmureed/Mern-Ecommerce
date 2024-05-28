import React from 'react'
import NavBar from './components/NavBar'

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
import ScrollToTop from './components/ScrollToTop';


import Category from './pages/Category';
import AdminCategories from "./Admin/AdminCategories"
import AdminUserList from './Admin/AdminUserList';
import AdminProductList from "./Admin/AdminProductList"
import AdminAllOrders from './Admin/AdminAllOrders';
import UserOrders from './User/UserOrders';
import AdminPrivateRoutes from './components/Routes/AdminPrivateRoutes'

const App = () => {

  const {auth}= useContext(AuthContext)
  return (
    <div>  
   <BrowserRouter>
   <ScrollToTop/>
   <NavBar/>
   <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/login' element={!auth.user ? <Login/> : <Dashboard/>}/>
   
    <Route path='/dashboard/:id' element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}/>
    <Route path='/orders/:id' element={<ProtectedRoutes><UserOrders/></ProtectedRoutes>}/>

    <Route path='/admin/panel/all-users' element={<AdminPrivateRoutes><AdminUserList/></AdminPrivateRoutes>}/>
    <Route path='/admin/panel/all-categories' element={<AdminPrivateRoutes><AdminCategories/></AdminPrivateRoutes>} />
    <Route path='/admin/panel/all-orders' element={<AdminPrivateRoutes><AdminAllOrders/></AdminPrivateRoutes>} />
    <Route path='/admin/panel/all-prodcuts' element={<AdminPrivateRoutes><AdminProductList/></AdminPrivateRoutes>}/>
    <Route path='/product/:slug' element={<ProductDetails/>}/>
    <Route path='/cart' element={<Cart/>}/>
    <Route path='/category/:slug' element={<Category/>}/>
    
    <Route path='/search' element={<SearchResult/>}/>
    
    <Route path='/register' element={!auth.user ? <Register/> : <Dashboard/>}/>
    <Route path='/about' element={<About/>}/>
   </Routes>
   
   </BrowserRouter>
    </div>
 
  )
}

export default App