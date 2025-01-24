import {useState,createContext, useEffect } from "react"
import { json } from "react-router-dom";

export const SearchContext = createContext();
export const SearchProvider= ({children})=>{
    const [search,setSearch]= useState({
        keyword:"",
        result:[]
        
    })




    useEffect(() => {
        
        const savedQuery = localStorage.getItem('search');
    
        
        if (savedQuery) {
            
            const parseData = JSON.parse(savedQuery);
            setSearch({
                ...search,
                result:parseData.resutls,
                keyword:parseData.keyword,
                
            })
        }
        
    }, []);
    
    return (
        <SearchContext.Provider value={{search,setSearch}}>
            {children}
        </SearchContext.Provider>
    )
}
