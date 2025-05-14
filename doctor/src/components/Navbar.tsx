import { NavLink, Outlet } from "react-router-dom"
import {Sidebar} from "./Sidebar"
import { assets } from "../assets/assets"

export const Navbar = () => {
  return (
    <div className="">

        <div className="flex justify-between items-center px-6 mx-8 my-4">

            <div className="flex gap-3 items-center">
                <NavLink to="/doctor-dashboard"><img src={assets.admin_logo} alt="" /></NavLink>

                <div className="text-slate-600"><button className="border rounded-full px-2 ml-3 border-slate-400">Doctor</button></div>
            </div>
            <div className="">
                <button className=" bg-primary-blue rounded-full py-3 px-11 text-white text-lg hover:cursor-pointer">Logout</button>
            </div>

        </div>

        <hr  className="bg-black"/>
        <div className="flex">
            <Sidebar/>
            <Outlet/>
        </div>
    </div>
  )
}
