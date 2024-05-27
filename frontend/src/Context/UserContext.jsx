import {useState,createContext,useEffect, } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();
export const AuthProvider= ({children})=>{
    const [auth,setAuth]= useState({
        user:null,
        
    })
    const token = JSON.parse(localStorage.getItem('token'))
      //default axios
  axios.defaults.headers.common["Authorization"] = token
    useEffect(()=>{
        const data =localStorage.getItem("auth")
        if(data){
            const parseData= JSON.parse(data)
            setAuth({
                ...auth,
                user:parseData,
                
            })
        }
        //eslint-disable-next-line
    },[])
    useEffect(() => {
        const checkTokenExpiration = () => {
          const token = localStorage.getItem('token');
    
          if (token) {
            try {
             
              const decodedToken = jwtDecode(token);
             
              const expirationTime = decodedToken.exp * 1000; 
              
              const currentTime = new Date().getTime();
    
              if (currentTime >= expirationTime) {
                
                localStorage.removeItem('token');
                localStorage.removeItem('auth');
              }
            } catch (error) {
              
              console.error('Error decoding token:', error);
            }
          }
        };
    
        
        checkTokenExpiration();
      }, []);
      
   
    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}