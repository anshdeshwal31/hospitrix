import { useContext, useEffect } from "react"
import { DoctorContext } from "../context/DoctorContext"
import { assets } from "../assets/assets"
import type { appointmentType } from "../types/Types"

export const DoctorDashboard = () => {
  const {doctorDashboardData, getDoctorDashData, doctorId, cancelAppointment , completeAppointment} = useContext(DoctorContext)
  console.log("dashboard data: ", doctorDashboardData);
  console.log("inside doctor dashboard")
  useEffect(() => { 
    getDoctorDashData(doctorId)
    console.log("inside use effect")
   },[])
  
  return (
    // <div>ansh</div>
    <div>
    {doctorDashboardData?(
    <div>
      <div className="flex gap-3 m-6  ">


        <div className="flex bg-blue-100 w-[220px] p-4 gap-4 rounded-lg">
          <img src={assets.earning_icon} className="h-[70px]" alt="" />
          <span className="flex flex-col gap-1">
            <p className="text-2xl">${doctorDashboardData.earnings}</p>
            <p>Earnings</p>
          </span>
        </div>


        <div className="flex bg-blue-100 w-[220px] p-4 gap-4 rounded-lg">
          <img src={assets.appointments_icon} className="h-[70px]" alt="" />
          <span className="flex flex-col gap-1">
            <p className="text-2xl">{doctorDashboardData.appointmentInfo} </p>
            <p>Appointments </p>
          </span>
        </div>

        <div className="flex bg-blue-100 w-[220px] p-4 gap-4 rounded-lg">
          <img src={assets.patients_icon} className="h-[70px]" alt="" />
          <span className="flex flex-col gap-1">
            <p className="text-2xl">{doctorDashboardData.patients}</p>
            <p>Patients</p>
          </span>
        </div>
      </div>


      <div className="ml-6 border-slate-200 rounded-t-lg border w-fit">
        <div className="flex font-medium text-lg gap-3 bg-blue-100 border border-slate-200 rounded-t-md p-2">
          <img src={assets.list_icon} alt="" />
          Latest Bookings
        </div>

        <div className="w-fit">
          {
            doctorDashboardData.latestAppointments.map((appointment:appointmentType) => { 
              return (
                <div key={appointment._id} className="flex gap-3 w-full p-3 border border-b-slate-200 ">

                  <img src={appointment.userId.image} className="h-[45px] rounded-full" alt="" />
                  <span>
                    <p>{appointment.userId.name}</p>
                    <p className="text-slate-500">Booking on {appointment.date.split('T')[0]}</p>
                  </span>

                  <span className="ml-[270px] lg:ml-[330px] xl:ml-[380px]">
                    {
                      appointment.isPending?(
                        <div className="flex gap-3">
                          <img src={assets.tick_icon} onClick={() => { completeAppointment(appointment._id) }} className="hover:cursor-pointer" alt="" />
                          <img src={assets.cancel_icon} onClick={() => { cancelAppointment(appointment._id) }} className="hover: cursor-pointer" alt="" />
                        </div>
                      ):(
                        appointment.isCompleted?(
                          <div className="mt-3 text-green-500 font-medium ml-4">Completed</div>
                        ):(
                          <div className="mt-3 text-red-600 font-medium ml-4">Cancelled</div>
                        )
                      )
                    }
                  </span>
                </div>
              )
             })
          }
        </div>
      </div>


    </div>
    ):(
      <p>loading dashboard data...</p>
    )}
    </div>
  )
}
