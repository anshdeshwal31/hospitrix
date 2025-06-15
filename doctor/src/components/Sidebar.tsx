import { assets } from "../assets/assets"
import { NavLink } from "react-router-dom"
import { FiAlignJustify } from "react-icons/fi";
import  {useState} from "react"

export const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false)

  return (
    <div>
      <FiAlignJustify className="scale-150 md:hidden  my-1 m-3" onClick={() => { setShowSidebar(!showSidebar) }}/>
      <div className={`w-[200px] md:opacity-100 md:w-[250px] lg:w-[330px] border-r-2 border-slate-200 fixed bg-white md:static h-screen transition-all duration-300 ${showSidebar?"w-[250px]":" w-0 opacity-0"}`}>
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
    </div>
  )
}
