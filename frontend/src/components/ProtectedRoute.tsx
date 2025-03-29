import { ReactNode, useContext } from "react"
import { UserContext } from "../context/UserContext"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({children}:{children:ReactNode}) => { 
    const {isLoggedIn} = useContext(UserContext)

    if(!isLoggedIn){
        return <Navigate to="/login" replace/>
    }

    return <>{children}</>
 }