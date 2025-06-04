import { useContext, useEffect, useState } from "react"
import { AdminContext} from "../context/AdminContext"
import { assets } from "../assets/admin/assets"

let count:number  = 0;

export const AdminDashboard = () => {
  console.log("this is admin dashboard")
  count++;
  console.log("count",count)
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState<Error| null>(null)
  const {adminDashData , getAdminDashData , cancelAppointment} = useContext(AdminContext)
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
      <div className=" w-screen">
        <div className="flex sm:flex-row flex-col gap-4 m-7 ">
        
          
          <div className="flex  rounded-md w-[200px] sm:w-[193px] lg:w-[220px] p-5 bg-blue-100 gap-3">
            <span className=""><img src={assets.doctor_icon} alt="" /></span>
            <span className="">
              <div className="text-2xl">{adminDashData.doctors}</div>
              <div className="">Doctors</div>
            </span>
          </div>

  
          <div className="flex rounded-md w-[200px] sm:w-[213px] lg:w-[220px] lg:p-5 py-5 pl-5 pr-2 bg-blue-100 gap-3">
            <span className=""><img src={assets.appointments_icon} alt="" /></span>
            <span className="">
              <div className="text-2xl">{adminDashData.appointments}</div>
              <div className="">Appointments</div>
            </span>
          </div>


          <div className="flex rounded-md w-[200px] sm:w-[193px] lg:w-[220px] p-5 bg-blue-100 gap-3">
            <span className=""><img src={assets.patients_icon} alt="" /></span>
            <span className="">
              <div className="text-2xl">{adminDashData.patients}</div>
              <div className="">Patients</div>
            </span>
          </div>

        </div>

        <div className=" ml-7 mt-3 pb-4 pr-6 w-[94%] sm:w-[85%] lg:w-[75%] xl:w-[70%]">
          <div className="flex text-xl font-medium mb-3 "><img src={assets.list_icon} className="mr-2"  />Latest Appointments</div>
          <div className="flex flex-col gap-3 ">
            {adminDashData.latestAppointments.map((appointment:any) => { 
              return(
                <div className="flex justify-between   bg-blue-100 rounded-md border" key={appointment._id}>

                <div className="flex">

                  <div className=""><img src={appointment.doctorId.image} className="w-10 border rounded-l-md mr-2 h-14 object-cover"/></div>

                  <div className="">
                    <div className="">Dr. {appointment.doctorId.name}</div>
           
                    <div className="">Booking on {appointment.doctorId.slots_booked?.[appointment._id]?.time || 'No time available'}, {appointment.doctorId.slots_booked?.[appointment._id]?.date.split("T")[0]}</div>
                  </div>
                </div>

                  <div className="hover:cursor-pointer mt-1"><img src={assets.cancel_icon} alt=""  onClick={() =>  cancelAppointment(appointment._id) }/></div>
                  
                </div>
              )
             })}
          </div>
        </div>
      </div>
    )
}
