import { assets } from "../assets/admin/assets"
import { NavLink } from "react-router-dom"

export const Navbar = () => {
  return (
    <>
        <div className="flex justify-between">
            <div className="flex px-10  py-2 gap-x-3">
                <NavLink to="/admin-dashboard"><img src={assets.admin_logo} className="h-[45px]" /></NavLink>
                <button className="px-3 h-6 text-sm border border-slate-500 rounded-full self-center text-slate-500">Admin</button>
            </div>

            <div className="px-10 py-2">
              <button className="bg-primary-pink rounded-full text-white px-12 py-3">Logout</button>
            </div>
        </div>
        <hr className="" />
    </>
  )
}
