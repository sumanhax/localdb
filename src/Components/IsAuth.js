
import { Navigate, Outlet } from "react-router-dom"



const ProtectedRoute=()=>{
  const  IsAuthToken=window.sessionStorage.getItem('token')
  IsAuthToken?<Outlet/>:<Navigate to="/errors"/>
}

export default ProtectedRoute;
