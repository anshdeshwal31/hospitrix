import { createContext, useState } from "react";
import { adminDashboardDataType, DoctorProfileWithoutId } from "../types/Types";
import {toast} from "react-toastify"
import axios from "axios"


export const AdminContext = createContext<any>(undefined)

export const AdminContextProvider:React.FC<{children:React.ReactNode}> = ({children}) => { 


    const backendUrl:string  = import.meta.env.VITE_BACKEND_URL

    const [adminDashData , setAdminDashData] = useState<adminDashboardDataType| undefined>(undefined)
    const [aToken , setAToken] = useState<string|null>(localStorage.getItem("aToken")?localStorage.getItem("aToken"):"")
    
    const adminLogin = async ( email:string , password:string) => { 

        try {
            const response  = await axios.post(backendUrl+"/api/admin/login",{
                email,password
            })
            if (response.data.success) {
                localStorage.setItem("aToken",response.data.token)
                setAToken(localStorage.getItem("aToken"))
                toast.success(response.data.message,{
                    className:"bg-green-500 text-white"
                })
                
            } else {
                toast.error(response.data.error.message,{
                    className:"bg-red-500 text-white"
                })
            }

        } catch (error) {
            console.log(error)
            toast.error("there was some error",{
                className:"bg-red-500 text-white"
            })
        }
    }


    const addDoctor = async (doc:DoctorProfileWithoutId) => { 
        try {
            const response = await axios.post(backendUrl+"/api/admin/addDoctor",doc,{
                headers:{
                    authorization: `Bearer ${aToken}`
                }
            })

            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-500 text-white"
                })
            } else {
                toast.error(response.data.error.message,{
                    className : "bg-red-500 text-white"
                })
            }
        } catch (error) {
            console.log(error)
            toast("there was some error",{
                className : "bg-red-500 text-white"
            })
        }
    }
    
    
    
    const deleteDoctor = async (doctorId:string) => { 
        try {
            const response = await axios.post(backendUrl+"/api/admin/deleteDoctor",{
                doctorId
            },{
                headers:{
                    authorization:`Bearer ${aToken}`
                }
            })
            
            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-500 text-white"
                })
            } else {
                toast.error(response.data.error.message,{
                    className : "bg-red-500 text-white"
                })
            }
        } catch (error) {
            console.log(error)
            toast("there was some error",{
                className : "bg-red-500 text-white"
            })
            
        }
     }


    const getAdminDashData = async () => { 
        try {
            const response = await axios.post(backendUrl+"/api/doctor/getDoctorDashboard",{} , {headers:
                {
                    authorization:`Bearer ${aToken}`
                }
            })
    
            if (response.data.success) {
                setAdminDashData(response.data.adminDashboardData);
            
            } else {
                toast.error(response.data.error.message,{
                    className : "bg-red-500 text-white"
                })
            }
        } catch (error) {
            console.log(error)
            toast.error("there was some error",{
                className : "bg-red-500 text-white"
            })   
        }
        
     }
     
     
     const value =  {
        adminDashData, getAdminDashData,
        adminLogin,
        addDoctor,
        deleteDoctor
     }
     
    return (
        <AdminContext.Provider value = {value}>
            {children}
        </AdminContext.Provider>
    )
}