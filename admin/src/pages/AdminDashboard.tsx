import { useContext, useEffect, useState } from "react"
import { AdminContext} from "../context/AdminContext"
// import { AppContext } from "../context/AppContext"
import { assets } from "../assets/admin/assets"
let count:number  = 0;

export const AdminDashboard = () => {
  console.log("this is admin dashboard")
  count++;
  console.log("count",count)
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState<Error| null>(null)
  const {adminDashData , getAdminDashData} = useContext(AdminContext)
  // const { slotDateFormat } = useContext(AppContext)
  
  useEffect(() => { 
    const fetchData = async () => {
        try {
          setLoading(true)
          await getAdminDashData()
          setLoading(false)
        } catch (error) {
          console.error("Error fetching dashboard data:", error)
          setError(error as Error)
          setLoading(false)
        }
      }
      
      fetchData()
    }, [])

     if (loading) return <div className="p-6 text-center">Loading dashboard data...</div>
     if (error) return <div className="p-6 text-center text-red-400">Error loading dashboard data</div>
     if (!adminDashData) return <div className="p-6 text-center">No dashboard data available</div>
     
    return (
      <div>
        <div className="flex">
        
          
          <div className="">
            <span className=""><img src={assets.doctor_icon} alt="" /></span>
            <span className="">
              <div className="">{adminDashData.doctors}</div>
              <div className="">Doctors</div>
            </span>
          </div>

  
          <div className="">
            <span className=""><img src={assets.appointments_icon} alt="" /></span>
            <span className="">
              <div className="">{adminDashData.appointments}</div>
              <div className="">Appointments</div>
            </span>
          </div>


          <div className="">
            <span className=""><img src={assets.patients_icon} alt="" /></span>
            <span className="">
              <div className="">{adminDashData.patients}</div>
              <div className="">Patients</div>
            </span>
          </div>

        </div>

        <div className=""></div>
      </div>
    )
}
