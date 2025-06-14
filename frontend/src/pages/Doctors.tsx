
import { NavLink, useParams, useNavigate } from "react-router-dom"
import { specialityData } from "../assets/frontend/assets"
import { v4 as uuidv4 } from 'uuid';
import DoctorCard from "../components/DoctorCard";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import {DNA } from 'react-loader-spinner';

const Doctors = () => {

    const {doctorList, getDoctorList} = useContext(UserContext)
    const [showFilter , setShowFilter] = useState<boolean>(false)
    const [loading , setLoading] = useState<boolean>(true);
    
    const navigate = useNavigate()

    const {speciality} = useParams()

    useEffect(() => { 
        const useEffectFunction =  async() => { 
            await getDoctorList()
            setLoading(false)
         }
         useEffectFunction();
        // getDoctorList()
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
        <div>

            {loading?<div className="flex justify-center pt-10 items-center"><DNA/></div>:
            <div className="flex flex-col ">

                <button className={`text-lg self-center w-fit ${showFilter?"bg-primary-blue text-white":"border-black border "} px-4 p-1 rounded-lg sm:hidden `} onClick={() => { setShowFilter(!showFilter) }}>Filters</button>

                <div className="lg:ml-[108px] self-center mt-4 mb-6  text-lg text-slate-600">Browse through the doctors specialist.</div>
                
                <div className="sm:flex-row flex flex-col gap-8 w-[95%] lg:w-[90%] xl:w-[85%] self-center">
                    <div className={`flex sm:opacity-100 sm:h-[350px] flex-col gap-5 text-slate-500 duration-300 transition-size ${showFilter?"opacity-100 h-[350px]":"opacity-0 h-0"}  items-center `} >
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

                    <div className="flex flex-wrap gap-x-6 gap-y-7 justify-center">
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
            </div>}
        </div>
    )
}

export default Doctors