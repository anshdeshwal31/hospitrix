import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { doctorInfoType } from '../types/Types';

const MyAppointments:React.FC = () => {
  const {doctors}:{doctors:doctorInfoType[]} = useContext(AppContext);
  return (
      <div className='w-full flex justify-center'>
        <div className=' w-[80%]'>
          <div className="self-start font-medium text-slate-600 text-xl mt-8">My appointments</div>
          <hr  className='my-2'/>
          {doctors.slice(0,2).map((item,index)=>(
            <div className='grid grid-cols-[1fr_2fr] gap-4 w-full sm:flex text-lg sm:gap-6 py-2 border-b' key={index}>
              <div>
                <img className='w-48 bg-indigo-50' src={item.image}  alt="" />
              </div>
              <div className='flex-1 text text-zinc-600'>
                <p className='text-neutral-800 font-semibold'>{item.name}</p>
                <p className='text-[17px]'>{item.speciality}</p>
                <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                <p className='text-sm'>{item.address.line1}</p>
                <p className='text-sm'>{item.address.line2}</p>
                <p className='text-xs mt-1'><span className='text- text-neutral-700 font-medium'></span></p>
                <p className='text-base mt-3'><span className='mr-1 text-base font-semibold'>Date & Time:</span>25 July 2024 | 7:30 PM</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-end mr-6 '>
                <button className='bg-primary-blue font-light text-base p-2 text-white text-center sm:min-w-48 border rounded-md'>Pay Online</button>
                <button className='bg-red-500 font-light text-base p-2 text-white text-center sm:min-w-48 border rounded-md'>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default MyAppointments