import { createContext, useState } from "react";
import axios  from "axios";
import { toast } from "react-toastify";
import { appointmentType, dashboardDataType, doctorProfileType } from "../types/Types";

const DoctorContext =  createContext<any>(undefined) 

export const AdminContextProvider :React.FC<{children:React.ReactNode}> =   ({children}) => { 

    
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    
    const [dToken , setDToken] = useState<string|null>(localStorage.getItem("dToken")?localStorage.getItem("dToken"):"")
    const [appointments, setAppointments] = useState<appointmentType[]>([])
    const [dashboardData, setDashboardData] = useState<dashboardDataType[]>([])
    const [doctorProfileData , setDoctorProfileData] = useState<doctorProfileType[]>([])

    

    const getAppointments = async () => { 
        try {
            const response = await axios.post(backendUrl+"/api/doctor/getAppointmentList",{} , {headers:
                {
                    authorization:`Bearer ${dToken}`
                }
            })

            if (response.data.success) {
                setAppointments(response.data.appointments.reverse())
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
    

    const getDoctorProfileData = async () => { 
        try {
            const response = await axios.post(backendUrl+"/api/doctor/getDoctorProfile",{} , {headers:
                {
                    authorization:`Bearer ${dToken}`
                }
            })
    
            if (response.data.success) {
                setDoctorProfileData(response.data.doctorInfo);
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
    
    
    const getDashData = async () => { 
        try {
            const response = await axios.post(backendUrl+"/api/doctor/getDoctorDashboard",{} , {headers:
                {
                    authorization:`Bearer ${dToken}`
                }
            })
    
            if (response.data.success) {
                setDashboardData(response.data.dashboardData);
            
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
    
    
    const cancelAppointment = async () => { 
        try {
            const response = await axios.post(backendUrl+"/api/doctor/cancelAppointment", {},{
                headers:{
                    authorization: `Bearer ${dToken}`
                }
            })
            
            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-500 text-white"
                })
                getAppointments()
                getDashData()
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
    
    
    const completeAppointment = async () => { 
        try {
            const response = await axios.post(backendUrl+"/api/doctor/completeAppointment", {},{
                headers:{
                    authorization: `Bearer ${dToken}`
                }
            })
            
            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-500 text-white"
                })
                getAppointments()
                getDashData()
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
        
        const value = {
            dToken, setDToken,backendUrl,
            appointments,
            completeAppointment, cancelAppointment,getAppointments, getDashData , getDoctorProfileData,
            dashboardData,
            doctorProfileData, setDoctorProfileData

        }
        return(
            <DoctorContext.Provider value={value}>
                {children}
            </DoctorContext.Provider>
        )
     }
    