import { useContext, useEffect } from "react"
import { DoctorCard } from "../components/DoctorCard"
import { AdminContext } from "../context/AdminContext"

export const DoctorList = () => {
  const{doctorList , getDoctorList} = useContext(AdminContext)
  useEffect(() => { 
    getDoctorList()
   })
  return (
    <div className="">

    </div>
  )
}
