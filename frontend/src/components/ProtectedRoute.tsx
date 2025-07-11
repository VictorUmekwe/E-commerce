import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../hooks/hooks"

const ProtectedRoute = () => {
    const {user } = useAppSelector((state) => state.auth)
    if (user) {
      return <Outlet/>
    }else{
        return <Navigate to='/signin'/>
    }
}

export default ProtectedRoute