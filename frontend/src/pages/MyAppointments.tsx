import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from '../context/AppContext'
import { appointmentType } from '../types/Types';
import { UserContext } from '../context/UserContext';
import { DNA } from 'react-loader-spinner';

const MyAppointments:React.FC = () => {
  // const {doctors}:{doctors:doctorInfoType[]} = useContext(AppContext);
  const {appointmentList , getAppointmentList , userId , cancelAppointment , payOnline} = useContext(UserContext)
  const [loading , setLoading] = useState<boolean>(true);

  console.log("inside the MyAppointments component")
  useEffect(() => { 
      const useEffectFunction = async () => {
        console.log("inside the useEffect of the myAppointments page");
        if (userId && userId.trim() !== "") {
            await getAppointmentList(userId.toString());
            setLoading(false);
          }}
        useEffectFunction();
  }, [userId]);


  return (
      <div>
      {loading?<div className='flex justify-center pt-12'><DNA/></div>:<div className='w-full flex justify-center'>
        <div className='sm:p-0 pl-3 w-[100%] sm:w-[70%] lg:w-[65%] flex flex-col gap-6 '>
          <div className="self-start font-medium text-slate-600 text-xl mt-8">My appointments</div>
          <hr  className='my-2'/>
          {appointmentList && appointmentList.map((item:appointmentType,index:number)=>(
            <div className='grid grid-cols-[1fr_2fr] gap-4 w-full sm:flex text-lg sm:gap-6 py-2 pb-4 border-b-[1px] border-slate-300' key={index}>
              <div>
                <img className='w-48 bg-indigo-50 h-[210px] object-cover object-top' src={item.doctorId.image}  alt="" />
              </div>
              <div className='flex-1 text text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.doctorId.name}</p>
                <p className='text-[17px]'>{item.doctorId.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-sm'>{item.doctorId.address.line1}</p>
                <p className='text-sm'>{item.doctorId.address.line2}</p>
                <p className='text-xs mt-1'><span className='text- text-neutral-700 font-medium'></span></p>
                <p className='text-base mt-3'><span className='mr-1 text-base font-semibold'>Date & Time:</span>{item.date.split('T')[0]} | {item.time}</p>
              </div>
              <div></div>
              {item.isPending?<div className='flex flex-col gap-2 justify-end mr-6 '>
                <button className='bg-primary-blue font-light text-base p-2 text-white text-center w-fit sm:px-0 px-14 sm:min-w-48 border rounded-md' onClick={() => { payOnline(item._id,item.doctorId.fees) }}>Pay Online</button>
                <button className='bg-red-500 font-light text-base p-2 text-white w-fit sm:px-0 px-[70px] text-center sm:min-w-48 border rounded-md' onClick={() => { cancelAppointment(item._id) }}>Cancel</button>
              </div>:
              <div className='self-end  mr-6'>{item.isCompleted?<button className=' font-light text-base p-2 text-green-500 border-green-500 text-center w-fit sm:px-0 px-14 sm:min-w-48 border rounded-md'>Completed</button>:
              <button className=' border-red-500 font-light text-base p-2 text-red-500 text-center sm:min-w-48 border rounded-md w-fit sm:px-0 px-14'>Cancelled</button>
                }
              </div>
              }
              {/* <hr className='bg-black h-1 ml-40 w-[100px]' /> */}
            </div>
          ))}
        </div>
      </div>}
      </div>
  )
}

export default MyAppointments