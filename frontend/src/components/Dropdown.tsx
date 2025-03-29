import React, { useContext, useState } from 'react'
import { UserContext } from '../context/UserContext'
import {Link} from "react-router-dom"

export const Dropdown = () => {
    const {isHover, setUToken , setIsLoggedIn , userProfile}  = useContext(UserContext)   

    const logoutUser = () => { 
        localStorage.removeItem("uToken")
        setUToken("")
        setIsLoggedIn(false)
    }
    
  return (
    isHover && 
    <div className='flex flex-col  text-white absolute top-[67px]  bg-black  rounded-md'>
        <Link to="/my-profile" className=' hover:bg-primary-blue transition-color duration-300 p-2'>My Profile</Link>
        <Link to="/my-appointments"className=' hover:bg-primary-blue transition-color duration-300 p-2'>My Appointments</Link>
        <Link to="/" className=' hover:bg-red-600 transition-color duration-300 p-2'onClick={logoutUser}>Logout</Link>
    </div>
  )
}
