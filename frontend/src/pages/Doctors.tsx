
import { NavLink, useParams, useNavigate } from "react-router-dom"
import { specialityData } from "../assets/frontend/assets"
import { v4 as uuidv4 } from 'uuid';
import DoctorCard from "../components/DoctorCard";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";

const Doctors = () => {

    const {doctorList, getDoctorList} = useContext(UserContext)
    
    const navigate = useNavigate()

    const {speciality} = useParams()

    useEffect(() => { 
        getDoctorList()
     },[])

    const handleSpecialityClick  = (clickedSpeciality:string,event: React.MouseEvent
    ):void => { 
        event.preventDefault()
        console.log('working 1 ')
        if(speciality === clickedSpeciality){
            console.log('working 2')
            navigate("/doctors", {replace:true});
            return;
        } 
        navigate(`/doctors/${clickedSpeciality}`);
        console.log('working 3')
     }
     
    return (
    <div className="flex flex-col ">

        <div className="ml-[168px] mt-4 mb-6  text-lg text-slate-600">Browse through the doctors specialist.</div>
        
        <div className="flex gap-8  w-[80%] self-center">
            <div className="flex flex-col gap-5 text-slate-500 ">
                {
                    specialityData.map((specialityItem ) => { 
                        return (
                            <NavLink 
                                to={`/doctors/${specialityItem.speciality}`} 
                                key={uuidv4()} 
                                onClick={(event) => handleSpecialityClick(specialityItem.speciality,event) }
                                className={({isActive})=>` w-[220px] border rounded-md border-slate-300 p-2 ${isActive?"bg-blue-100":""}`}>
                                {specialityItem.speciality}
                            </NavLink>
                        )
                    })
                }
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-7">
                {
                    doctorList.filter((doctorItem:any) => speciality? doctorItem.speciality.toLowerCase() === speciality.toLowerCase():true).map((doctorItem:any) => { 
                    return (
                        <DoctorCard 
                            key={doctorItem._id} 
                            name = {doctorItem.name} 
                            image = {doctorItem.image} 
                            speciality= {doctorItem.speciality} 
                            _id = {doctorItem._id} 
                        />
                    )
                }) 
            }
            </div>
        </div>
    </div>
    )
}

export default Doctors