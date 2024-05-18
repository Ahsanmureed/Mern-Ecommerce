import {useState,createContext } from "react"

export const SearchContext = createContext();
export const SearchProvider= ({children})=>{
    const [search,setSearch]= useState({
        keyword:" ",
        result:[]
    })

    return (
        <SearchContext.Provider value={{search,setSearch}}>
            {children}
        </SearchContext.Provider>
    )
}