import  { useContext, useEffect } from 'react'
import { AdminContext } from '../context/AdminContext'

export const AppointmentList = () => {

  const{getAllAppointmentList, allAppointment} = useContext(AdminContext)
  useEffect(() => { 
    getAllAppointmentList()
   },[])
  return (
    <div className="w-[1100px] flex flex-col ml-8 mt-2">
      <div className="text-2xl font-medium my-3">All Apppointments</div>

      <div className='border py-2 font-medium text-md'>
        <div className=" flex gap-2 w-full pl-2">
          <div className="w-1/12">ind</div>
          <div className="w-1/6">Patients</div>
          <div className="w-1/6">Department</div>
          <div className="w-1/6">date & time</div>
          <div className="w-1/6">Doctor</div>
          <div className="w-1/12">Fees</div>
        </div>

        <div className=" mt-3 font-normal">
          {
            allAppointment.map((appointment:any, index:number) => { 
              return (
                <div className="flex border  gap-2 pl-2 py-2" key={appointment._id}>

                  <div className="w-1/12">{index+1}</div>
                  <div className="w-1/6"><img src={appointment.userId.name} alt="" /></div>
                  <div className="w-1/6">{appointment.doctorId.speciality}</div>
                  <div className="w-1/6">{appointment.time} | {appointment.date.split("T")[0]}</div>
                  <div className="w-1/6">{appointment.doctorId.name}</div>
                  <div className="w-1/12">{appointment.doctorId.fees}</div>

                </div>
              )
             })
          }
        </div>

      </div>
    </div>
  )
}
