import { useContext, useEffect } from "react"
import { DoctorContext } from "../context/DoctorContext"
import type { appointmentType } from "../types/Types";
import { assets } from "../assets/assets";


export const AppointmentList = () => {
  const {appointments, completeAppointment, cancelAppointment, getAppointments,doctorId} =  useContext(DoctorContext);

  useEffect(() => { 
    getAppointments(doctorId)
   },[])
  return (
    <div className="w-[1100px] ml-20 flex flex-col gap-3" >
      <div className="text-2xl font-medium text-slate-800 mt-5">All Appointments</div>

      <div className="bg-slate-100  w-full">
        <div className="bg-blue-200 w-full flex justify-between text-slate-800 font-medium border-t-2 rounded-t-lg text-lg">
          <span className="w-[50px] text-center py-2">#</span>
          <span className="w-[200px] py-2">Patient</span>
          <span className="w-[80px] py-2">Payment</span>
          <span className="w-[40px] py-2">Age</span>
          <span className="w-[200px] py-2">Date & Time</span>
          <span className="w-[80px] py-2">Fees Paid</span>
          <span className="w-[150px] py-2">Action</span>
        </div>

        <div>
          {
            appointments.map((appointment:appointmentType, index: number) => { 
              const yearOfBirth  = new Date(appointment.userId.dateOfBirth).getFullYear();
              const currentYear = new Date().getFullYear();
              const age = currentYear - yearOfBirth;

              return (
                <div className="flex justify-between py-2 border border-slate-300">

                  <span className="w-[50px] text-center py-3">{index+1}</span>
                  <span className="w-[200px] flex gap-2 text-lg"><img src={appointment.userId.image} alt="" className="w-[50px] rounded-full" /> <p className="py-3">{appointment.userId.name}</p></span>
                  <span className="flex items-center"><button className="rounded-full border-slate-400 text-slate-500 w-[80px] border text-sm">CASH</button></span>
                  <span className="w-[40px] py-3">{age}</span>
                  <span className="w-[200px] py-3"> {appointment.date.split("T")[0]} , {appointment.time}</span>
                  <span className="w-[70px] py-3">{appointment.feesPaid}</span>
                  <span className="w-[150px]">{
                        appointment.isPending?(
                          <div className="flex gap-3">
                            <img src={assets.tick_icon} onClick={() => { completeAppointment(appointment._id) }} className="hover:cursor-pointer" alt="" />
                            <img src={assets.cancel_icon} onClick={() => { cancelAppointment(appointment._id) }} className="hover: cursor-pointer" alt="" />
                          </div>
                        ):(
                          appointment.isCompleted?(
                            <div className="mt-3 text-green-500 font-medium ml-4 my-2">Completed</div>
                          ):(
                            <div className="mt-3 text-red-600 font-medium ml-4 my-2 align-text-top">Cancelled</div>
                          )
                        )
                    }</span>

                </div>
              )
               })
          }
        </div>
      </div>

    </div>

  )
}

