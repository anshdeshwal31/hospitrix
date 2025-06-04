import { assets } from "../assets/admin/assets"
import { NavLink } from "react-router-dom"
import { FiAlignJustify } from "react-icons/fi";
import { useState } from "react";


export const Sidebar = () => {

    const [showSidebar , setShowSidebar]  = useState<boolean>(false);
    
    return (
    <div>
        <div>
        <FiAlignJustify className=" transition-all md:h-0 md:w-0  scale-150 m-3 md:m-0 hover:cursor-pointer bg-white" onClick={() => { setShowSidebar(!showSidebar) }} />
        </div>
        
        <div className={`lg:w-[330px] fixed md:static bg-white md:w-[250px] md:opacity-100 text-lg  text-slate-600 border-slate-200 border h-full transition-all ${showSidebar?"w-[250px] opacity-100":"w-10 opacity-0"}`}>


            <div className="">
                <NavLink to= "/admin-dashboard" className={({isActive}) =>  `flex p-4 gap-x-3 transition-all duration-500 ${isActive?"bg-blue-300 border-r-4 border-black text-white   ":""}` }>
                    <img src={assets.home_icon}  className="" />
                    Dashboard
                </NavLink>
            </div>

            <div className="">
                <NavLink to="/appointment-list" className={({isActive}) =>  `flex p-4 gap-x-3 transition-all duration-500 ${isActive?" bg-blue-300 border-r-4 border-black text-white  ":""}` }>
                    <img src={assets.appointment_icon}  className="" />
                    Appointments
                </NavLink>
            </div>
            
            <div className="">
                <NavLink to="/add-doctor" className={({isActive}) => `flex p-4 gap-x-3 transition-all duration-500 ${isActive?"bg-blue-300 border-r-4 border-black text-white  ":""}` }>
                    <img src={assets.add_icon}  className="" />
                    Add Doctor
                </NavLink>
            </div>
            
            <div className="">
                <NavLink to="/doctor-list" className={({isActive}) =>  `flex p-4 gap-x-3 transition-all duration-500 ${isActive?"bg-blue-300 border-r-4 border-black text-white  ":""}` }>
                    <img src={assets.people_icon}  className="" />
                    Doctors List
                </NavLink>
            </div>

        </div>
    </div>
  )
}
