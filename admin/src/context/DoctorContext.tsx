import { createContext, useState } from "react";
import {appointmentType}


const AdminContext = createContext<undefined>(undefined) 

export const AdminContextProvider :React.FC<{children:React.ReactNode}> =  ({children}) => { 
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken , setDToken] = useState<string|null>(localStorage.getItem("dToken")?localStorage.getItem("dToken"):"")
    const [appointments, setAppointments] = useState<appointmentType>([])
    
    return(

    )
 }