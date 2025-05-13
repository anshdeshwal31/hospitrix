import  { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'
import { appointmentType } from '../types/Types'

export const AppointmentList =  () => {

  const{getAllAppointmentList, allAppointment} = useContext(AdminContext)
  useEffect(() => { 
    getAllAppointmentList()
  },[])
  console.log("appointments list on the admin panel: ",allAppointment)
  return (
    <div className="w-[1100px] flex flex-col ml-8 mt-2">
      <div className="text-2xl font-medium my-3">All Apppointments</div>

      <div className='border py-2 font-medium text-md'>
        <div className=" flex gap-2 w-full pl-2">
          <div className="w-[50px]">ind</div>
          <div className="w-[220px]">Patients</div>
          <div className="w-[220px]">Department</div>
          <div className="w-[220px]">date & time</div>
          <div className="w-[170px]">Doctor</div>
          <div className="w-[100px]">Fees</div>
        </div>

        <div className=" mt-3 font-normal">
          {
            allAppointment.map((appointment:appointmentType, index:number) => { 
              return (
                <div className="flex border  gap-2 pl-2 py-2 items-center" key={appointment._id}>

                  <div className="w-[50px]">{index+1}</div>
                  <div className="w-[220px] flex items-center gap-1"><img src={appointment.userId.image} className='w-[45px] rounded-full' alt="" />{appointment.userId.name}</div>
                  <div className="w-[220px]">{appointment.doctorId.speciality}</div>
                  <div className="w-[220px]">{appointment.time} | {appointment.date.split("T")[0]}</div>
                  <div className="w-[170px]">Dr. {appointment.doctorId.name}</div>
                  <div className="w-[100px]">{appointment.doctorId.fees}</div>

                </div>
              )
             })
          }
        </div>

      </div>
    </div>
  )
}
