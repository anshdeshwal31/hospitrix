import { createContext, useState } from "react";
import axios  from "axios";
import { toast } from "react-toastify";
import type { appointmentType, doctorDashboardDataType , doctorProfileType, updateDoctorProfileType } from "../types/Types";

export const DoctorContext =  createContext<any>(undefined) 

export const DoctorContextProvider:React.FC<{children:React.ReactNode}> =   ({children}) => { 

    // const navigate = useNavigate()
    
    const backendUrl:string = import.meta.env.VITE_BACKEND_URL
    
    const [dToken , setDToken] = useState<string|null>(localStorage.getItem("dToken")?localStorage.getItem("dToken"):"")
    const [appointments, setAppointments] = useState<appointmentType[]>([])
    const [doctorDashboardData, setDoctorDashboardData] = useState<doctorDashboardDataType | null>(null)
    const [doctorProfileData , setDoctorProfileData] = useState<doctorProfileType>()
    const[doctorList,setDoctorList] = useState<doctorProfileType[]>([])
    const [doctorId, setDoctorId] = useState<string>(localStorage.getItem("doctorId") || "")

    

    const getAppointments = async (doctorId:string) => { 
        try {
            const response = await axios.post(backendUrl+"/api/doctor/getAppointmentList",{doctorId} , {headers:
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
    

    const getDoctorProfileData = async (doctorId:string) => { 
        try {
            const response = await axios.post(backendUrl+"/api/doctor/getDoctorProfile",{doctorId} , {headers:
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
            console.log("error: ",error)
            toast("there was some error",{
                className : "bg-red-500 text-white"
            })
            
        }
    }
    
    
    const getDoctorDashData = async (doctorId:string) => { 
        try {
            const response = await axios.post(backendUrl+"/api/doctor/getDoctorDashboard",{doctorId} , {headers:
                {
                    authorization:`Bearer ${dToken}`
                }
            })
            console.log("dtoken: ", dToken)
    
            if (response.data.success) {
                setDoctorDashboardData(response.data.dashboardData);
                console.log("request succcessfull")
                console.log("dashboard data: ", response.data.doctorDashboardData)
                console.log("response: ", response)
            
            } else {
                console.log("inside the getDoctorDashData")
                console.log("request failed")
                toast.error(response.data.message,{
                    className : "bg-red-500 text-white"
                })
                console.log(response.data.error)
            }
        } catch (error) {
            // console.log("there was some error")
            // console.log("error message: ",(error as Error).message)
            console.log("error: ", error)
            toast.error("there was some error",{
                className : "bg-red-500 text-white"
            })
            
        }
        
    }
    
    
    const cancelAppointment = async (appointmentId:string) => { 
        try {
            const response = await axios.post(backendUrl+"/api/doctor/cancelAppointment", {appointmentId},{
                headers:{
                    authorization: `Bearer ${dToken}`
                }
            })
            console.log("response: ", response)
            if (response.data.success) {
                toast.error(response.data.message,{
                    className:"bg-red-400 text-white"
                })
                getDoctorDashData(doctorId)
                getAppointments(doctorId)
            } else {
                toast.error(response.data.error.message,{
                    className:"bg-red-500 text-white"
                })
            }
        } catch (error) {
            console.log("error: ",error)
            toast.error("there was some error",{
                className : "bg-red-500 text-white"
            })
            
        }
    }
    
    
    const completeAppointment = async (appointmentId:string) => { 
        try {
            const response = await axios.post(backendUrl+"/api/doctor/completeAppointment", {appointmentId},{
                headers:{
                    authorization: `Bearer ${dToken}`
                }
            })
            
            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-500 text-white"
                })
                getDoctorDashData(doctorId)
                getAppointments(doctorId)
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
        
    const doctorLogin = async (email:string , password:string) => { 
        try {
            const response  = await axios.post(backendUrl+"/api/doctor/login",{
                email,password
            })
            if (response.data.success) {
                localStorage.setItem("dToken",response.data.token)
                localStorage.setItem("doctorId", response.data.doctorId)
                setDToken(localStorage.getItem("dToken"))
                setDoctorId(response.data.doctorId)
                toast.success(response.data.message,{
                    className:"bg-green-500 text-white"
                })
                // navigate("/doctor-dashboard")
                
            } else {
                // Safe access to error message
                const errorMessage = response.data.error?.message || response.data.message || "Login failed"
                toast.error(errorMessage,{
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

    const editDoctor = async (doc:updateDoctorProfileType) => { 

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
        doctorLogin, editDoctor, changeDoctorAvailablity, getDoctorList, doctorList,doctorId
    }

    return(
        <DoctorContext.Provider value={value}>
            {children}
        </DoctorContext.Provider>
    )
    }