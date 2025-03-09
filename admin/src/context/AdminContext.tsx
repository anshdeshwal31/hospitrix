import { createContext, useState } from "react";
import { adminDashboardDataType, DoctorProfileWithoutId } from "../types/Types";
import {toast} from "react-toastify"
import axios from "axios"
import { data } from "react-router-dom";


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

            console.log("Login Response: ", response.data)
        
            if (response.data.success) {
                localStorage.setItem("aToken",response.data.token)
                setAToken(localStorage.getItem("aToken"))

                // console.log("before showing the success toast")
                
                toast.success(response?.data?.message,{
                    className:"bg-green-400 text-white"
                })
                
                // console.log("after showing the success toast")
                
            } else {

                console.log("before showing the error toast")
                
                toast.error(response.data.message,{
                    className:"bg-red-400 text-white"
                })
                
                console.log("after showing the error toast")
            }
            return response;

        } catch (error) {
            console.log(error)

            // console.log("the message before showing the toast of the catch block ")

            toast.error((error as Error).message,{
                className:"bg-red-500 text-white"
            })

            // console.log("the message after showing the toast of the catch block ")

            return { data: { success: false, message: "Login failed" } };
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
            console.log("Fetching admin dashboard data with token:", aToken)

            if (!aToken) {
                throw new Error("No authentication token")
            }

            console.log("before making the request to the backend")

            const response = await axios.post(backendUrl+"/api/admin/getAdminDashboardData",{} , {headers:
                {
                    authorization:`Bearer ${aToken}`
                }
            })

            console.log("Dashboard data response:",response.data)
            
            if (response.data.success) {
                setAdminDashData(response.data.adminDashboardData);
            
            } else {
                toast.error(response.data.error.message,{
                    className : "bg-red-500 text-white"
                })
            }
        } catch (error) {
            console.log(error)
            toast.error((error as Error).message,{
                className : "bg-red-500 text-white"
            })   
        }
        
    }
     
    const cancelAppointment = async (appointmentId:string) => { 
        console.log("start of the cancel appointment function")
        try {

            console.log("before making the request to the backend to cancel appointment")

            const response = await axios.post(backendUrl+"/api/admin/cancelAppointment", {
                appointmentId
            },{
                headers:{
                    authorization: `Bearer ${aToken}`
                }
            })
            
            console.log("Response from the backend", response)
            console.log("after making the request to the backend to cancel appointment")
            
            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-500 text-white"
                })
                getAdminDashData()
            } else {
                toast.error(response.data.error.message,{
                    className:"bg-red-500 text-white"
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
        cancelAppointment,
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