import { useContext, useEffect , useState} from "react"
import { DoctorCard } from "../components/DoctorCard"
import { AdminContext } from "../context/AdminContext"
import { DNA } from "react-loader-spinner"

export const DoctorList = () => {
  const{doctorList , getDoctorList} = useContext(AdminContext)
  const [loading , setLoading ] = useState<boolean>(true)

  
  useEffect(() => { 
    const useEffectFunction = async() => {
      console.log("Before making the request to the backend")
      await getDoctorList()
      console.log("After making the request to the backend")
      setLoading(false)
    }
    useEffectFunction()
  },[])
  return (
    <div>{loading?<div className="flex justify-center pt-9 w-[75vw]"><DNA/></div>:
      <div className="flex justify-center flex-wrap gap-8 pt-8 pr-4">
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
    }</div>
  )
}
