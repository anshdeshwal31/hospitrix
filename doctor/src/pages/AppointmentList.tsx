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
    <div className="w-full px-4 sm:px-6 lg:ml-5 xl:ml-20 lg:w-[1100px] flex flex-col gap-3" >
      <div className="text-xl sm:text-2xl font-medium text-slate-800 mt-5">All Appointments</div>

      <div className="bg-slate-100 w-full lg:w-fit xl:w-[95%]">
        {/* Desktop Header - Hidden on mobile */}
        <div className="hidden lg:flex bg-blue-200 w-full xl:justify-between text-slate-800 font-medium border-t-2 rounded-t-lg text-lg">
          <span className="w-[20px] xl:w-[50px] text-center py-2">#</span>
          <span className="w-[200px] px-3 py-2">Patient</span>
          <span className="w-[40px] py-2 xl:pl-5">Age</span>
          <span className="w-[150px] xl:w-[200px] py-2 xl:px-2">Date & Time</span>
          <span className="w-[80px] py-2">Fees Paid</span>
          <span className="w-[150px] py-2 xl:text-start pl-2 xl:px-3">Action</span>
        </div>

        <div className="">
          {
            appointments.map((appointment:appointmentType, index: number) => { 
              const yearOfBirth  = new Date(appointment.userId.dateOfBirth).getFullYear();
              const currentYear = new Date().getFullYear();
              const age = currentYear - yearOfBirth;

              return (
                <div key={appointment._id} className="border border-slate-300 p-4 lg:p-0">
                  {/* Mobile Layout */}
                  <div className="lg:hidden space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-600">#{index+1}</span>
                        <img src={appointment.userId.image} alt="" className="w-10 h-10 rounded-full object-cover object-top" />
                        <div>
                          <p className="font-medium text-lg text-slate-800">{appointment.userId.name}</p>
                          <p className="text-sm text-slate-600">Age: {age}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div>
                        <p className="text-slate-600">Date & Time</p>
                        <p className="font-medium">{appointment.date.split("T")[0]}, {appointment.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-slate-600">Fees Paid</p>
                        <p className="font-medium">{appointment.feesPaid}</p>
                      </div>
                    </div>

                    <div className="flex justify-center pt">
                      {appointment.isPending ? (
                        <div className="flex gap-4">
                          <button 
                            onClick={() => completeAppointment(appointment._id)}
                            className="flex items-center gap-2 bg-green-100 hover:bg-green-200 px-3 py-2 rounded-lg transition-colors"
                          >
                            <img src={assets.tick_icon} className="w-4 h-4" alt="" />
                            <span className="text-sm text-green-700">Complete</span>
                          </button>
                          <button 
                            onClick={() => cancelAppointment(appointment._id)}
                            className="flex items-center gap-2 bg-red-100 hover:bg-red-200 px-3 py-2 rounded-lg transition-colors"
                          >
                            <img src={assets.cancel_icon} className="w-4 h-4" alt="" />
                            <span className="text-sm text-red-700">Cancel</span>
                          </button>
                        </div>
                      ) : (
                        appointment.isCompleted ? (
                          <div className="text-green-500 font-medium px-3 py-2 bg-green-50 rounded-lg">
                            Completed
                          </div>
                        ) : (
                          <div className="text-red-600 font-medium px-3 py-2 bg-red-50 rounded-lg">
                             Cancelled
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:flex xl:justify-between py-2">
                    <span className="xl:w-[50px] w-[20px] text-center py-3">{index+1}</span>
                    <span className="w-[200px] flex gap-2 text-lg">
                      <img src={appointment.userId.image} alt="" className="w-[50px] rounded-full object-cover object-top" /> 
                      <p className="py-3">{appointment.userId.name}</p>
                    </span>
                    <span className="w-[40px] py-3 text-center xl:text-end">{age}</span>
                    <span className="w-[150px] xl:w-[200px] py-3"> {appointment.date.split("T")[0]} , {appointment.time}</span>
                    <span className="w-[70px] py-3">{appointment.feesPaid}</span>
                    <span className="w-[100px] xl:w-[150px]">{
                          appointment.isPending?(
                            <div className="flex gap-3">
                              <img src={assets.tick_icon} onClick={() => { completeAppointment(appointment._id) }} className="hover:cursor-pointer" alt="" />
                              <img src={assets.cancel_icon} onClick={() => { cancelAppointment(appointment._id) }} className="hover:cursor-pointer" alt="" />
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
                </div>
              )
               })
          }
        </div>
      </div>

    </div>

  )
}

