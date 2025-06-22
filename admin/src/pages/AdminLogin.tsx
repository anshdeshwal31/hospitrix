import { useContext, useState } from "react"
import { AdminContext } from "../context/AdminContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { assets } from "../assets/admin/assets";
import { DNA } from "react-loader-spinner"

export const AdminLogin = () => {
    const[email,setEmail] = useState("")
    const [loading , setLoading ] = useState(false)
    const {adminLogin} = useContext(AdminContext)
    const[password, setPassword] = useState("")
    const[passwordVisible , setPasswordVisible] = useState(false)
    const navigate = useNavigate();

    const onLogin = async (e: React.FormEvent<HTMLFormElement>) => { 
        e.preventDefault()
        if(!email || !password){
            const errorMessage = "Email and password are required"
            toast.error(errorMessage,{
                className:"bg-red-300 text-white"
            })
            return 
        }

        setLoading(true)

        // console.log("loading right now ")

        const response = await adminLogin(email, password);
        setLoading(false)

        // console.log("loading completed")
        
        if(response?.data?.success){
            // navigate("/admin-dashboard")
            // setTimeout(() => { 
            //     navigate("admin-dashboard")  
            // },500)
            navigate("/admin-dashboard")
        }
       
    }

    if(loading) {
        return(

            <div className="flex items-center justify-center h-screen w-screen">
            <DNA
                visible={true}
                height="100"
                width="100"
                />
            </div>
         )
    }
    
    return (
    <div>

        <div className="flex justify-around m-3">
            <img src={assets.admin_logo} className="scale-90 h-14 transition-all sm:scale-100" alt="" />
            <button className="rounded-full border border-slate-300 text-slate-700 font-light py-0 px-2">Admin panel</button>
        </div>

        <hr />
        
        <div className="flex items-center flex-col pt-[175px] h-screen w-full ">
            <form onSubmit={onLogin} className='py-6 px-5 sm:px-12 border border-slate-200 text-slate-700 h-fit w-fit rounded-md gap-5 flex flex-col shadow-slate-300 shadow-lg'>

                <div className="text-2xl font-semibold text-black text-center">
                    Login
                </div>

                <div className="">
                    Please login to book your appointment
                </div>
                
                <div className="flex flex-col">
                    Email
                    <label className=''>
                        <input type="text" className="border border-slate-300 rounded-md w-[270px] h-[35px] p-2" onChange={(e) => { setEmail(e.target.value) }}/>
                    </label>
                </div>
                <div className="flex flex-col">
                    Password
                    <label className='relative'>
                        <input type={passwordVisible?"text":"password"} className="border border-slate-300 rounded-md w-[270px] h-[35px] p-2" onChange={(e) => { setPassword(e.target.value) }}/> 
                        <span className= " absolute top-[9px] right-3 hover:cursor-pointer" onClick={() => {setPasswordVisible(!passwordVisible) }}>{passwordVisible?<MdVisibilityOff size="18px" />:<MdVisibility size="18px"/>
                        }</span>
                    </label>
                </div>

                <div className="">
                    <button type="submit" className="border rounded-md bg-primary-blue transition-all duration-300 my-5   hover:bg-black py-2 px-[115px] text-white" >Login</button>
                </div>
            </form>

            <div className='flex gap-3 mt-5'>
                <a href="http://localhost:5175/login"><button className='border rounded-lg px-8 py-3  text-slate-400 bg-black'>Doctor Login</button></a>
                <a href="http://localhost:5173/login"><button className='border rounded-lg px-8 py-3  text-slate-400 bg-black'>User Login</button></a>
            </div>
        </div>
    </div>
  )
}
