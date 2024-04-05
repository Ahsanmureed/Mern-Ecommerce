
import Loader from "../Loader"


export default function PrivateRoute({children}) {
 

 
    const token = localStorage.getItem('auth')
  return token ? children : <Loader/>
   
}
