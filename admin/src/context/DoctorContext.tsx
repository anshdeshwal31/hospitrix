import { createContext, useState } from "react";
import axios  from "axios";
import { toast } from "react-toastify";
import { appointmentType, doctorDashboardDataType, doctorProfileType } from "../types/Types";

export const DoctorContext =  createContext<any>(undefined) 

export const DoctorContextProvider:React.FC<{children:React.ReactNode}> =   ({children}) => { 

    
    const backendUrl:string = import.meta.env.VITE_BACKEND_URL
    
    const [dToken , setDToken] = useState<string|null>(localStorage.getItem("dToken")?localStorage.getItem("dToken"):"")
    const [appointments, setAppointments] = useState<appointmentType[]>([])
    const [doctorDashboardData, setDoctorDashboardData] = useState<doctorDashboardDataType[]>([])
    const [doctorProfileData , setDoctorProfileData] = useState<doctorProfileType>()
    const[doctorList,setDoctorList] = useState<doctorProfileType[]>([])

    

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
            toast((error as Error).message,{
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
    
    
    const getDoctorDashData = async () => { 
        try {
            const response = await axios.post(backendUrl+"/api/doctor/getDoctorDashboard",{} , {headers:
                {
                    authorization:`Bearer ${dToken}`
                }
            })
    
            if (response.data.success) {
                setDoctorDashboardData(response.data.doctorDashboardData);
            
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
                getDoctorDashData()
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
                getDoctorDashData()
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
        
    const doctorLogin = async (doctorId:string , email:string , password:string) => { 
        try {
            const response  = await axios.post(backendUrl+"/api/doctor/login",{
                doctorId,email,password
            })
            if (response.data.success) {
                localStorage.setItem("dToken",response.data.token)
                setDToken(localStorage.getItem("dToken"))

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

    const editDoctor = async (doc:doctorProfileType) => { 

        try {
            const response = await axios.post(backendUrl+"/api/doctor/editDoctorProfile",doc,
            {headers:
                {
                    authorization:`Bearer ${dToken}`
                }
            })

            if (response.data.success ) {
                setDoctorProfileData(response.data.updatedDoctorData);
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


    const changeDoctorAvailablity = async (doc:doctorProfileType) => { 

        try {
            const response = await axios.post(backendUrl+"/api/doctor/changeDoctorAvailablity",{
                doctorId:doc._id
            },{headers:
                {
                    authorization:`Bearer ${dToken}`
                }
            })
            if (response.data.success) {
                doc.available = !doc.available;
                setDoctorProfileData(doc);
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
    
    
    const getDoctorList = async () => { 
        try {
            const response = await axios.post(backendUrl+"/api/doctor/getDoctorList",{},{headers:
                {
                    authorization:`Bearer ${dToken}`
                }
            })
            if (response.data.success) {
                setDoctorList(response.data.doctorList)
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

    
    const value = {
        dToken, setDToken,backendUrl,
        appointments,
        completeAppointment, cancelAppointment,getAppointments, getDoctorDashData , getDoctorProfileData,
        doctorDashboardData,
        doctorProfileData, setDoctorProfileData,
        doctorLogin, editDoctor, changeDoctorAvailablity, getDoctorList, doctorList
    }

    return(
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
    }