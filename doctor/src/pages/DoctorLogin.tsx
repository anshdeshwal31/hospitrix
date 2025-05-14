import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { DoctorContext } from "../context/DoctorContext";

export const DoctorLogin = () => {
    const[email,setEmail] = useState("")
    const [loading , setLoading ] = useState(false)
    const {doctorLogin} = useContext(DoctorContext)
    const [error, setError] = useState("")
    const[password, setPassword] = useState("")
    const[passwordVisible , setPasswordVisible] = useState(false)
    const navigate = useNavigate();

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault()
        if(!email || !password){
            const errorMessage = "Email and password are required"
            setError(errorMessage)
            toast.error(errorMessage,{
                className:"bg-red-300 text-white"
            })
            return 
        }

        setLoading(true)

        // console.log("loading right now ")

        const response = await doctorLogin(email, password);
        setLoading(false)

        // console.log("loading completed")
        
        if(response?.data?.success){
            // navigate("/admin-dashboard")
            // setTimeout(() => { 
            //     navigate("admin-dashboard")  
            // },500)
            navigate("/doctor-dashboard")
        }
       
    }
    return (
    <div className="flex items-center flex-col justify-center h-screen w-screen ">
        <form onSubmit={onLogin} className='py-6 px-16 border border-slate-400 text-slate-700 h-fit w-fit rounded-md gap-5 flex flex-col'>

            <div className="text-2xl font-semibold text-black text-center">
                Login
            </div>

            <div className="self-center">
                Please login 
            </div>
            
            <div className="flex flex-col">
                Email
                <label className=''>
                    <input type="text" className="border border-slate-300 rounded-md w-[270px] h-[35px] p-2" onChange={(e) => { setEmail(e.target.value) }}/>
                </label>
            </div>
            <div className="flex flex-col">
                Password
                <label className=''>
                    <input type={passwordVisible?"text":"password"} className="border border-slate-300 rounded-md w-[270px] h-[35px] p-2" onChange={(e) => { setPassword(e.target.value) }}/> 
                    <span className= " relative bottom-6 left-[245px] hover:cursor-pointer" onClick={() => {setPasswordVisible(!passwordVisible) }}>{passwordVisible?<MdVisibilityOff size="18px" />:<MdVisibility size="18px"/>
                    }</span>
                </label>
            </div>

            <div className="">
                <button type="submit" className="border rounded-md bg-primary-blue transition-all duration-300 my-5   hover:bg-black py-2 px-[115px] text-white" >Login</button>
            </div>
        </form>
    </div>
  )
}
