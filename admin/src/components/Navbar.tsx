import { assets } from "../assets/admin/assets"
import {  NavLink, Outlet, useNavigate } from "react-router-dom"
import { Sidebar } from "./Sidebar"
import { useContext } from "react"
import { AdminContext } from "../context/AdminContext"

export const Navbar = () => {
  const navigate = useNavigate();
  const {setAToken} = useContext(AdminContext)
  const logoutAdmin = () => {
    localStorage.removeItem("aToken")
    setAToken("")
    navigate("/login",{replace:true})
  }
  return (
    <div className="h-full">
      <div>

          <div className="flex justify-between">
              <div className="flex sm:px-10 pl-3 pr-7  py-2 pt-4 gap-x-3">
                  <NavLink to="/admin-dashboard"><img src={assets.admin_logo} className="h-[45px]" /></NavLink>
                  <button className="px-3 h-6 text-sm border border-slate-500 rounded-full self-center text-slate-500">Admin</button>
              </div>

              <div className="sm:px-10 px-2 py-2">
                <button className="bg-primary-blue rounded-full text-white px-4 py-3 sm:px-12 sm:py-4" onClick={logoutAdmin}>Logout</button>
              </div>
          </div>
          <hr className="" />

      </div>

      <div className="flex h-screen">
        <Sidebar/>
        <Outlet/>
      </div>

    </div>
  )
}
