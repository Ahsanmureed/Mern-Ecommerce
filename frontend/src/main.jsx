import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './Context/UserContext'
import { CartProvider } from './Context/CartContext.jsx'
import { SearchProvider } from './Context/SearchContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <SearchProvider>
  <CartProvider>
  <AuthProvider>
    <React.StrictMode>
    <App />
    
  </React.StrictMode>,
  </AuthProvider>
  </CartProvider>
  
  </SearchProvider>
)
