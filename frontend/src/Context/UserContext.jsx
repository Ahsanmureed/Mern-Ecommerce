import {useState,createContext,useEffect, } from "react"
import axios from "axios"
import { jwtDecode } from "jwt-decode";
export const AuthContext = createContext();
export const AuthProvider= ({children})=>{
    const [auth,setAuth]= useState({
        user:null,
        
    })
    const token = localStorage.getItem('token')
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
              // Decode the token to get its payload
              const decodedToken = jwtDecode(token);
              // Extract the expiration time from the payload
              const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
              // Compare the expiration time with the current time
              const currentTime = new Date().getTime();
    
              if (currentTime >= expirationTime) {
                // Token is expired, remove it from local storage
                localStorage.removeItem('token');
                localStorage.removeItem('auth');
              }
            } catch (error) {
              // Handle decoding errors
              console.error('Error decoding token:', error);
            }
          }
        };
    
        // Call the function to check token expiration when the component mounts
        checkTokenExpiration();
      }, []);
      
   
    return (
        <AuthContext.Provider value={{auth,setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}