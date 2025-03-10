import { createContext, ReactNode, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const UserContext = createContext<any>(null)

export const UserContextProvider = ({children}:{children:ReactNode}) => {
    const backendUrl:string = import.meta.env.VITE_BACKEND_URL
    const [uToken , setUToken] = useState<string|null>(localStorage.getItem("uToken")?localStorage.getItem("uToken"):"")
    const [appointmentList , setAppointmentList] = useState([])
    const [userProfile , setUserProfile] = useState([])

    
    const userLogin = async (email:string , password:string) => { 
        try {
            const response = await axios.post(backendUrl+"/api/user/login",{
                email,password
            })

            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-400 text-white"
                })
                localStorage.setItem("uToken",response.data.token)
                setUToken(localStorage.getItem("uToken"))
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
    
    const saveInformation = async (user:any) => { 
        try {
            const response = await axios.post(backendUrl+"/api/user/saveInformation",user,{
                headers:{
                    authorization:`Bearer ${uToken}`
                }
            })
            
            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-400 text-white"
                })
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
    
    
    const bookAppointment = async (date:string , time:string , userId:string , doctorId:string) => { 
        
        try {
            if(!uToken){
                throw new Error("No authentication token")
            } 
            
            const response = await axios.post(backendUrl+"/api/user/bookAppointment",{
                date , time , userId , doctorId
            },{
                headers:{
                    authorization:`Bearer ${uToken}`
                }
            })

            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-400 text-white"
                })
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
    
    const payOnline = async () => { 
        try {
            if(!uToken){
                throw new Error("No authentication token")
            } 
            const response = await axios.post(backendUrl+"/api/user/payOnline")
            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-400 text-white"
                })
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
    
    const cancelAppointment = async (appointmentId:string) => { 
        try {
            if(!uToken){
                throw new Error("No authentication token")
            } 
            const response = await axios.post(backendUrl+"/api/user/cancelAppointment",{appointmentId},{
                headers:{
                    authorization:`Bearer ${uToken}`
                }
            })

            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-400 text-white"
                })
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
    
    
    
    const editUser = async (userId:string , name:string , email:string , password:string , image:string , address:{line1:string , line2:string}, gender:string , dateOfBirth:string , phoneNumber:string) => { 
        try {
            if(!uToken){
                throw new Error("No authentication token")
            } 
            const response = await axios.post(backendUrl+"/api/user/editUser",{
                userId,
                name,
                email, 
                password ,
                image,
                address,
                gender ,
                dateOfBirth,
                phoneNumber
            },{
                headers:{
                    authorization:`Bearer ${uToken}`
                }
            })
            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-400 text-white"
                })
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
    
    const getUserProfile = async (userId:string) => { 
        try {
            if(!uToken){
                throw new Error("No authentication token")
            } 
            const response = await axios.post(backendUrl+"/api/user/getUserProfile",{userId},{
                headers:{
                    authorization:`Bearer ${uToken}`
                }
            })
            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-400 text-white"
                })
                setUserProfile(response.data.userInfo)
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
    
    const getAppointmentList = async (userId:string) => { 
        try {
            if(!uToken){
                throw new Error("No authentication token")
            } 
            const response = await axios.post(backendUrl+"/api/user/getAppointmentList",{userId},{
                headers:{
                    authorization:`Bearer ${uToken}`
                }
            })
            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-400 text-white"
                })
                setAppointmentList(response.data.appointments)
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

    
    const value = {
        userProfile , appointmentList, userLogin,bookAppointment, payOnline, cancelAppointment , saveInformation , editUser , getUserProfile , getAppointmentList
    }

    return (
    <UserContext.Provider value = {value}>
        {children}
    </UserContext.Provider>
    )
}