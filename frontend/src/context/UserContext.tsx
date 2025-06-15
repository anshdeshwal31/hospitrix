import { createContext, ReactNode, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { editUserType, appointmentType } from "../types/Types";

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
    
    const bookAppointment = async (date:string, time:string, userId:string, doctorId:string) => { 
        console.log("book appointment function called")
        console.log("date:", date)
        console.log("time:", time)
        console.log("userId:", userId)
        console.log("doctorId:", doctorId)
        
        try {
            console.log("inside try block")
            if(!uToken){
                throw new Error("No authentication token")
            }
            
            if(!userId || !doctorId) {
                throw new Error("User or doctor information missing");
            }
            
            const response = await axios.post(backendUrl+"/api/user/bookAppointment",{
                date, time, userId, doctorId
            },{
                headers:{
                    authorization:`Bearer ${uToken}`
                }
            })

            if (response.data.success) {
                toast.success(response.data.message,{
                    className:"bg-green-400 text-white"
                })
                return true; // Return true for successful booking
            } else {
                toast.error(response.data.message,{
                    className:"bg-red-400 text-white"
                })
                return false;
            }
        } catch (error) {
            toast.error((error as Error).message,{
                className:"bg-red-400 text-white"
            })
            return false;
        }
    }
    

    const payOnline = async (appointmentId:string,amount:number) => { 
        try {
            if(!uToken){
                throw new Error("No authentication token")
            } 
            
            const orderResponse = await axios.post(backendUrl+"/api/user/payOnline",{appointmentId,amount},
                {
                    headers:{
                        Authorization: `Bearer ${uToken}`
                    }
                }
            )
            
            if (!orderResponse.data.success){
                console.log("the request to make an order for the payment was unsuccessfull")
                toast.error(orderResponse.data.message,{
                    className:"bg-red-400 text-white"
                })
                return ;
            }
            console.log("the request to make an order was successfull")
            const {orderId,amount:orderAmount,currency,key} = orderResponse.data
            
            const options = {
                key,
                amount:orderAmount,
                currency,
                name:"Hospitrix",
                description:"Appointment Payment",
                order_id:orderId,
                handler: async (response:any) => { 
                    try {
                        const verifyResponse = await axios.post(backendUrl+"/api/user/verifyPayment",
                            {
                                razorpay_order_id:response.razorpay_order_id,
                                razorpay_payment_id:response.razorpay_payment_id,
                                razorpay_signature:response.razorpay_signature,
                                appointmentId
                            },
                            {headers:{
                                Authorization:`Bearer ${uToken}`
                            }}
                        )
                        
                        if(verifyResponse.data.success){
                            toast.success(response.data.message,{
                                className:"bg-green-400 text-white"
                            })
                        }
                        else{
                            toast.error(response.data.message,{
                                className:"bg-red-400 text-white"
                            })
                        }
                        
                    } catch (error) {
                        toast.error(response.data.message,{
                            className:"bg-red-400 text-white"
                        })
                        console.log("error: ",error)
                    }
                },
                 prefill: {
                    name: "User Name",
                    email: "user@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            }

            const rzp = new (window as any).Razorpay(options);
            rzp.open();
            
            
        } catch(error){
            console.log("error: ",error)
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
                // setAppointmentList(appointmentList.filter((item:appointmentType) =>  item._id != appointmentId ))
            } else {
                getAppointmentList(userId)
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
                console.log("response: ",response)
            }
        } catch (error) {
            toast.error((error as Error).message,{
                className:"bg-red-400 text-white"
            })
            console.log("error: ",error)
            
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
                console.log("user profile inside the get user profile function: ",response.data)
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
        console.log("getAppointmentList function called");
        try {
            console.log("inside the try block of the getAppointmentList function")
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
                console.log("appointment list: ", response.data.appointments)
            } else {
                console.log("the request inside the getAppointmentList function failed")
                console.log("error in format of the data sent to the backend: ", response.data.error)
                toast.error(response.data.message,{
                    className:"bg-red-400 text-white"
                })
            }
        } catch (error) {
            console.log("inside the catch block of the getAppointmentList function ")
            console.log("error:",error as Error)
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