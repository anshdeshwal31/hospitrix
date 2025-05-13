import { NavLink, Outlet } from "react-router-dom"
import {Sidebar} from "./Sidebar"
import { assets } from "../assets/assets"

export const Navbar = () => {
  return (
    <div>

        <div className="flex justify-between items-center px-6 mx-8 my-4">

            <div className="flex gap-3 items-center">
                <NavLink to="/doctor-dashboard"><img src={assets.admin_logo} alt="" /></NavLink>

                <div className="text-slate-600"><button className="border rounded-full px-2 ml-3">Doctor</button></div>
            </div>
            <div className="">
                <button className=" bg-blue-400 rounded-full py-3 px-11 text-white text-lg">Logout</button>
            </div>

        </div>

        <div className="flex">
            <Sidebar/>
            <Outlet/>
        </div>
    </div>
  )
}
