import { DoctorCardType } from "../types/Types"
import { Link } from "react-router-dom"

export const DoctorCard = ({ name, image , speciality,_id}:DoctorCardType) => {
  return (
    <div className="border border-blue-200 rounded-lg  ">
        <Link to = {`/appointment/${_id}`}>
        <div className="bg-primary-blue overflow-hidden ">
            <img src={image} alt="" className="h-[250px] hover:scale-110 transition-all duration-500 rounded-lg"/>
        </div>

        <div className="py-4 px-4">
        <div className="text-green-400 flex gap-2">
            <p className="w-2 h-2 rounded-full bg-green-400 self-center"></p>
            <span>Available</span> 
        </div>
        <div className="text-xl font-medium">{name}</div>
        <div className="font-light text-gray-600">{speciality}</div>
        </div>
        </Link>
    </div>
  )
}
