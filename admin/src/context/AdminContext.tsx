import { createContext, useState } from "react";
import { adminDashboardDataType, DoctorProfileWithoutId } from "../types/Types";
import {toast} from "react-toastify"
import axios from "axios"


export const AdminContext = createContext<any>(null)

export const AdminContextProvider:React.FC<{children:React.ReactNode}> = ({children}) => { 


    const backendUrl:string  = import.meta.env.VITE_BACKEND_URL
    const [doctorList,setDoctorList] = useState([])
    const [allAppointment , setAllAppointment] = useState([])
    const [adminDashData , setAdminDashData] = useState<adminDashboardDataType| undefined>(undefined)
    const [aToken , setAToken] = useState<string|null>(localStorage.getItem("aToken"))


    const getAllAppointmentList = async () => { 
        try {

            if (!aToken) {
                throw new Error("No authentication token")
            }
            const response =  await axios.post(backendUrl+"/api/admin/getAppointmentList",{},{
                headers:{
                    authorization:`Bearer ${aToken}`
                }
            }
            )

            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-400 text-white"
                })
                setAllAppointment(response.data.appointments)
            } else {
                toast.error(response.data.message,{
                    className:"bg-red-400 text-white"
                })
            }
            
        } catch (error) {
            toast.error((error as Error).message,{
                className:"bg-red-400 text-white"
            })
        }
    }


    const adminLogin = async ( email:string , password:string) => { 

        try {

            // if (!aToken) {
            //     throw new Error("No authentication token")
            // }
            
            const response  = await axios.post(backendUrl+"/api/admin/login",{
                email,password
            })

            console.log("Login Response: ", response.data)
        
            if (response.data.success) {
                localStorage.setItem("aToken",response.data.token)
                setAToken(response.data.token) // Set the actual token, not localStorage.getItem()
    
                toast.success(response?.data?.message,{
                    className:"bg-green-400 text-white"
                })
                
            } else {
                toast.error(response.data.message,{
                    className:"bg-red-400 text-white"
                })
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

            if (!aToken) {
                throw new Error("No authentication token")
            }
            console.log("Before making a call to the backend")
            const response = await axios.post(backendUrl+"/api/admin/addDoctor",doc,{
                headers:{
                    authorization: `Bearer ${aToken}`
                }
            })
            console.log("after making a call to the backend")
            // console.log("Response", response)
            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-500 text-white"
                })
                console.log("response",response)
            } else {
                toast.error(response.data.error.message,{
                    className : "bg-red-500 text-white"
                })
            }
        } catch (error) {
            console.log(error)
            toast((error as Error).message,{
                className : "bg-red-500 text-white"
            })
        }
    }
    
    
    
    const deleteDoctor = async (doctorId:string) => { 
        try {

            if (!aToken) {
                throw new Error("No authentication token")
            }
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

            if (!aToken) {
                throw new Error("No authentication token")
            }

            console.log("before making the request to the backend to cancel appointment")
            window.confirm("Are you sure you want to cancel the appointment?")
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
     

    const getDoctorList = async () => { 
        try {

            if (!aToken) {
                throw new Error("No authentication token")
            }
            const response = await axios.post(backendUrl+"/api/admin/getDoctorList",{},{headers:
                {
                    authorization:`Bearer ${aToken}`
                }
            })
            if (response.data.success) {
                setDoctorList(response.data.doctors)
                console.log("doctors list ",doctorList)
                console.log("response", response)
                toast.success(response.data.message,{
                    className:"bg-green-500 text-white"
                })
            } else {
                toast.error(response.data.message||response.data.error,{
                    className:"bg-red-500 text-white"
                })
            }
        } catch (error) {
            toast.error("there was some error",{
                className:"bg-red-500 text-white"
            })
  
        }
    }
    
    const changeDoctorAvailablity = async (doctorId:string) => { 
        try {
            const response = await axios.post(backendUrl+"/api/admin/changeDoctorAvailablity",{doctorId},
                {
                    headers:{
                        authorization: `Bearer ${aToken}`
                    }
                }
            )
            if(response.data.success){
                toast.success(response.data.message,{
                    className:"bg-green-400 text-white"
                })
            }
            else{
                toast.error(response.data.message,{
                    className:"bg-red-500 text-white"
                })
            }
        } catch (error) {
            toast.error((error as Error).message,{
                className:"bg-red-500 text-white"
            })
        }
     }

     const value =  {
        getDoctorList,
        doctorList,
        allAppointment,
        getAllAppointmentList,
        cancelAppointment,
        adminDashData, getAdminDashData,
        adminLogin,
        addDoctor,
        deleteDoctor,
        changeDoctorAvailablity
     }
     
    return (
        <AdminContext.Provider value = {value}>
            {children}
        </AdminContext.Provider>
    )
}