import { useContext, useEffect } from "react"
import { DoctorCard } from "../components/DoctorCard"
import { AdminContext } from "../context/AdminContext"

export const DoctorList = () => {
  const{doctorList , getDoctorList} = useContext(AdminContext)
  useEffect(() => { 
    console.log("Before making the request to the backend")
    getDoctorList()
    console.log("After making the request to the backend")
  },[])
  return (
    <div className="flex flex-wrap">
      {
        doctorList.map((doctor:any) => { 
          return (
            <div className="">
              <DoctorCard name={doctor.name} image={doctor.image} speciality={doctor.speciality} _id = {doctor._id} availablity={doctor.available}/>
            </div>
          )
         })
      }
    </div>
  )
}
