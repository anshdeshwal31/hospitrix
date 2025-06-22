import { useContext, useState } from "react"
import { DoctorCardType } from "../types/Types.ts"
import { AdminContext } from "../context/AdminContext"

export const DoctorCard = ({ name, image , speciality,_id }:DoctorCardType) => {
  const {changeDoctorAvailablity} = useContext(AdminContext)
  const [isChecked , setIsChecked] = useState(true);
  const changeDoctorAvailablityFuntion = () => { 
    setIsChecked(!isChecked);
    changeDoctorAvailablity(_id)
   }
  return (
    <div className="border border-blue-200 rounded-lg  ">
        {/* <Link to = {`/appointment/${_id}`}> */}
        <div className="overflow-hidden w-[250px] h-fit rounded-t-lg ">
            <img src={image} alt="" className="object-cover object-top h-[260px] w-full hover:scale-110 transition-all duration-500 rounded-t-lg"/>
        </div>

        <div className="py-4 px-4">
        <div className="text-xl font-medium">{name}</div>
        <div className="font-light text-gray-600">{speciality}</div>
        <div>
          <label htmlFor="" className="">
            <input type="checkbox" className="m-1" checked= {isChecked} onChange={changeDoctorAvailablityFuntion}/>
            Available
          </label>
        </div>
        </div>
        {/* </Link> */}
    </div>
  )
}
