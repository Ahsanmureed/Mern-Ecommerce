
import { useContext } from "react"
import Loader from "../Loader"
import { AuthContext } from "../../Context/UserContext"


export default function AdminPrivateRoutes({children}) {
 const {auth}= useContext(AuthContext)

 
    const token = JSON.parse(localStorage.getItem('auth'))
  return token?.role ==1 ? children : <Loader path={`dashboard/${token._id}`}/>
   
}
