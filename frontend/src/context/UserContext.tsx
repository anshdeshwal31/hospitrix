import { createContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { editUserType } from "../types/Types";

export const UserContext = createContext<any>(null)

export const UserContextProvider = ({children}:{children:ReactNode}) => {
    // const navigate = useNavigate()
    const backendUrl:string = import.meta.env.VITE_BACKEND_URL
    const [uToken , setUToken] = useState<string|null>(localStorage.getItem("uToken")?localStorage.getItem("uToken"):"")
    const [appointmentList , setAppointmentList] = useState([])
    const [userProfile , setUserProfile] = useState<any>({})
    const [doctorList , setDoctorList] = useState<any[]>([])
    const [userId , setUserId] = useState<string>("")
    const [isLoggedIn , setIsLoggedIn] = useState<boolean>(localStorage.getItem("uToken")?true:false)
    const [isHover , setIsHover] = useState<boolean>(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password , setPassword] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("uToken");
        if (token) {
            // Need to get userId from token or localStorage
            // If you store userId in localStorage:
            const storedUserId = localStorage.getItem("userId");
                setUserId(storedUserId as string);
                getUserProfile(storedUserId as string);
        }
    }, []);

    
    const userLogin = async (email:string , password:string) => { 
        console.log("executing login function ")
        try {

            const response = await axios.post(backendUrl+"/api/user/login",{
                email,password
            })

            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-400 text-white"
                })
                console.log("login successfull")

                localStorage.setItem("uToken",response.data.token)
                localStorage.setItem("userId", response.data.userId);

                console.log("uToken",uToken)
                setUToken(localStorage.getItem("uToken"))
                console.log("uToken",uToken)
                setIsLoggedIn(true)
                setUserId(response.data.userId)
                getUserProfile(response.data.userId);
                return true;
            } else {
                toast.error(response.data.message,{
                    className:"bg-red-400 text-white"
                })
                console.log(response.data)
                console.log(response.data.message)
                console.log("login unsuccessful")
            }
            
        } catch (error) {
            console.log("got an error while loggin in")
            toast.error((error as Error).message,{
                className:"bg-red-400 text-white"
            })
        }
        return false;
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
                setIsLoggedIn(true)
                localStorage.setItem("uToken",response.data.token)
                localStorage.setItem("userId", response.data.userId);

                getUserProfile(response.data.userId)
                return true;
            } 
            else {
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
        console.log("user data: ", user)
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
            if(!localStorage.getItem("uToken")){
                throw new Error("No authentication token")
            } 

            const response = await axios.post(backendUrl+"/api/user/getUserProfile",{userId},{
                headers:{
                    authorization:`Bearer ${localStorage.getItem("uToken")}`
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
        userProfile , appointmentList, userLogin,bookAppointment, payOnline, cancelAppointment , createUserAccount, editUser , getUserProfile , getAppointmentList, doctorList, getDoctorList , userId , isLoggedIn , setIsLoggedIn,
        isHover , setIsHover , name , email , setName , setEmail , password , setPassword , uToken , setUToken , setUserId 
    }

    return (
        <UserContext.Provider value = {value}>
            {children}
        </UserContext.Provider>
    )
}