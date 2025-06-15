import  { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import { appointmentType } from '../types/Types'
import { DNA } from 'react-loader-spinner'

export const AppointmentList =  () => {

  const{getAllAppointmentList, allAppointment} = useContext(AdminContext)
  const [ loading , setLoading] = useState<boolean>(true)

  useEffect(() => {
    const useEffectFunction =  async () => {
      await getAllAppointmentList();
      setLoading(false);
    }
    useEffectFunction()

  },[])
  console.log("appointments list on the admin panel: ",allAppointment)
  return (
    <div >
      {loading?<div className='flex justify-center w-[75vw] pt-8'><DNA/></div>:

    <div className="w-[372px] sm:w-[500px] md:w-[600px] lg:w-[750px] xl:w-[900px] 2xl:w-[1100px] flex flex-col sm:ml-4 xl:ml-10 2xl:ml-16 mt-5 pr-2 mb-5">
      <div className="text-2xl font-medium my-3">All Apppointments</div>

      <div className=' bg-slate-100  font-medium text-md '>
        <div className="bg-blue-200 justify-between text-lg font-medium text-slate-800 flex gap-2 w-full sm:pl-2 pl-1 py-3 rounded-t-lg">
          <div className="w-[50px] sm:pl-2">ind</div>
          <div className="w-[220px]">Patients</div>
          <div className="w-[220px] hidden lg:block">Department</div>
          <div className="w-[220px]">date & time</div>
          <div className="w-[150px]">Doctor</div>
          <div className="w-[100px] text-center">Fees</div>
        </div>

        <div className=" font-normal">
          {
            allAppointment.map((appointment:appointmentType, index:number) => { 
              return (
                <div className="flex border justify-between border-slate-300 gap-1 md:gap-2 pl-2 py-2 items-center" key={appointment._id}>

                  <div className=" w-[30px] sm:w-[50px] sm:pl-2">{index+1}</div>
                  <div className="w-[220px] flex items-center gap-1 text-lg"><img src={appointment.userId.image} className='w-[45px] h-[45px] object-cover object-top  rounded-full ' alt="" />{appointment.userId.name}</div>
                  <div className="w-[220px] lg:block hidden ">{appointment.doctorId.speciality}</div>
                  <div className="w-[100px] md:w-[220px]">{appointment.time} | {appointment.date.split("T")[0]}</div>
                  <div className="w-[170px] text-center">Dr. {appointment.doctorId.name}</div>
                  <div className="w-[50px] sm:w-[80px] text-center">{appointment.doctorId.fees}</div>

                </div>
              )
            })
          }
        </div>

      </div>
    </div>
          }
        </div>
  )
}
