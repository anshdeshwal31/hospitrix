import { NavLink, Outlet } from "react-router-dom"
import {Sidebar} from "./Sidebar"
import { assets } from "../assets/assets"

export const Navbar = () => {
  return (
    <div className="">

        <div className="flex  sm:justify-between items-center pl-6 mx-2 sm:mx-8 my-4">

            <div className="flex gap-3 items-center">
                <NavLink to="/doctor-dashboard"><img src={assets.admin_logo} alt="" className="self-start h-12" /></NavLink>

                <div className="text-slate-600"><button className="border rounded-full px-3 py-1 sm:ml-3 mr-3 border-slate-400 ">Doctor</button></div>
            </div>
            <div className="">
                <button className=" bg-primary-blue rounded-full py-2 px-5 sm:py-3 sm:px-11 text-white text-lg hover:cursor-pointer self-end">Logout</button>
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
