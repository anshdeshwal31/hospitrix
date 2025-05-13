import { assets } from "../assets/assets"
import { NavLink } from "react-router-dom"

export const Sidebar = () => {
  return (
    <div className="w-[330px]">
        <NavLink to="/doctor-dashboard" className={({isActive}) =>  `flex text-lg gap-2 py-4 text-slate-700 px-8  transition-all duration-500 ${isActive?"bg-blue-300 border-r-4 border-black text-white":""}` }>
            <img src={assets.home_icon} alt="" />
            <p>Dashboard</p>
        </NavLink>

        <NavLink to="/appointment-list" className={({isActive}) =>  `flex text-lg gap-2 py-4 text-slate-700 px-8  transition-all duration-500 ${isActive?"bg-blue-300 border-r-4 border-black text-white":""}` }>
            <img src={assets.appointment_icon} alt="" />
            <p>Appointments</p>
        </NavLink>

        <NavLink to="/my-profile" className={({isActive}) =>  `flex text-lg gap-2 py-4 text-slate-700 px-8  transition-all duration-500 ${isActive?"bg-blue-300 border-r-4 border-black text-white":""}` }>
            <img src={assets.people_icon} alt="" />
            <p>Profile</p>
        </NavLink>
    </div>
  )
}
