import { createContext, ReactNode, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { createUserType, editUserType } from "../types/Types";
import { Navigate, replace } from "react-router-dom";

export const UserContext = createContext<any>(null)

export const UserContextProvider = ({children}:{children:ReactNode}) => {
    // const navigate = useNavigate()
    const backendUrl:string = import.meta.env.VITE_BACKEND_URL
    const [uToken , setUToken] = useState<string|null>(localStorage.getItem("uToken")?localStorage.getItem("uToken"):"")
    const [appointmentList , setAppointmentList] = useState([])
    const [userProfile , setUserProfile] = useState<any[]>([])
    const [doctorList , setDoctorList] = useState<any[]>([])
    const [userId , setUserId] = useState<string>("")

    
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
    
    // const saveInformation = async (user:user) => { 
    //     try {
    //         const response = await axios.post(backendUrl+"/api/user/saveInformation",user,{
    //             headers:{
    //                 authorization:`Bearer ${uToken}`
    //             }
    //         })
    //         console.log(response)
    //         console.log("calling save information")
    //         console.log("user id:", userId)

    //         if (response.data.success) {
    //             toast.success(response.data.message,{
    //                 className:"bg-green-400 text-white"
    //             })
    //             setUserId(response.data.userId)
    //         } else {
    //             toast.error(response.data.message,{
    //                 className:"bg-red-400 text-white"
    //             })
    //         }
    //     } catch (error) {
    //         console.log(error)
    //         toast.error((error as Error).message,{
    //             className:"bg-red-400 text-white"
    //         })
            
    //     }
        
    // }
    

    const createUserAccount = async (name:string,  email:string , password:string, image:string = "", address:{line1:string,line2:string} = {line1:"",line2:""},gender:string = "Male" , dateOfBirth:string = new Date().toISOString() , phoneNumber:string = "0000000000" ) => {
        try {
            const response = await axios.post(backendUrl+"/api/user/createAccount",{name , email, password , image , address , gender , dateOfBirth ,phoneNumber})

            if (response.data.success) {
                console.log(response.data.message)
                toast.success(response.data.message,{
                    className:"bg-green-400 text-white"
                })
                return true;
                // navigate("/")
            } else {
                console.log(response.data.error)
                toast.error(response.data.message, {
                    className:"bg-green-400 text-white"
                })
                return false;
            }
        } catch (error) {
            console.log("error: ",error)
            toast.error((error as Error).message,{
                className:"bg-green-400 text-white"
            })
            return error;
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
    
    
    
    const editUser = async (user:editUserType) => { 
        try {

            if(!uToken){
                throw new Error("No authentication token")
            } 
            console.log("calling edit user")
            console.log("user id:", userId)
            const response = await axios.post(backendUrl+"/api/user/editUser",user,{
                headers:{
                    authorization:`Bearer ${uToken}`
                }
            })
            console.log(response)

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

    const getDoctorList = async () => { 
        try {
            const response = await axios.post(backendUrl+"/api/user/getDoctorList")
            console.log("Request successfull")
            console.log("Response",response)
            setDoctorList(response.data.doctors)
            
        } catch (error) {
            console.log("there was some error")
            toast.error((error as Error).message,{
                className:"bg-red-400 text-white"
            })
            
        }
     }
    
    const value = {
        userProfile , appointmentList, userLogin,bookAppointment, payOnline, cancelAppointment , createUserAccount, editUser , getUserProfile , getAppointmentList, doctorList, getDoctorList , userId
    }

    return (
        <UserContext.Provider value = {value}>
            {children}
        </UserContext.Provider>
    )
}