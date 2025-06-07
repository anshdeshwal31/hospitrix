import { useContext, useEffect, useState } from "react"
import { DoctorContext } from "../context/DoctorContext";
import { ImageUpload } from "../utils/ImageUpload";

export const DoctorProfile = () => {
  const{doctorProfileData , doctorId , editDoctor , getDoctorProfileData} = useContext(DoctorContext)

  const [imageBase64 , setImageBase64] = useState<string>("");
  const [addressLine1 , setAddressLine1] = useState<string>("") 
  const [addressLine2 , setAddressLine2] = useState<string>("")
  const [fees , setFees] = useState<number>(0);
  const [aboutMessage , setAboutMessage] = useState<string>("")
  const [isAvailable , setIsAvailable] = useState<boolean>(true)
  const [ isEdit , setIsEdit] = useState<boolean>(false)
  
  const saveHandler = async () => { 
    if(!isEdit){
      setIsEdit(!isEdit);
      return;
    }
    else{
      await editDoctor({doctorId ,image:imageBase64,about:aboutMessage, available:isAvailable,address:{
        line1:addressLine1,
        line2:addressLine2
      },
      fees
    })
      setIsEdit(!isEdit);
      return;

    }
  }
  
  const handleImage = async (e:React.ChangeEvent<HTMLInputElement>) => { 
    const temp = await ImageUpload(e);
    setImageBase64(temp as string);
   }
  
  // Effect for fetching data (runs once)
  useEffect(() => { 
    const fetchData = async () => { 
      if (doctorId) {
        await getDoctorProfileData(doctorId)
      }
    }
    fetchData();
  }, [doctorId]) // Only depend on doctorId

  // Separate effect for updating local state when data changes
  useEffect(() => {
    if (doctorProfileData) {
      setImageBase64(doctorProfileData?.image || "")
      setFees(doctorProfileData?.fees || null)
      setAddressLine1(doctorProfileData?.address?.line1 || "")
      setAddressLine2(doctorProfileData?.address?.line2 || "")
      setAboutMessage(doctorProfileData?.about || "")
      console.log("doctor profile data: ", doctorProfileData)
    }
  }, [doctorProfileData]) // This will only run when doctorProfileData actually changes

  return (
    <div className=" w-[80vw]">

    {doctorProfileData?
    <div className="ml-5 mt-5 bg-white">
      <img src={imageBase64} alt="" className="border rounded-lg h-[300px] my-3 w-[250px] object-cover" />
      {isEdit && <input type="file" accept="image/*" onChange={handleImage}/>}
      
      <div className="bg-blue-50 w-[70vw] md:w-[60vw] xl:w-[50vw] p-5 border rounded-lg">
        <p className="text-3xl text-slate-700">Dr. {doctorProfileData?.name}</p>
        <div className="flex text-slate-600 mb-2">
          <p className="text-md">{doctorProfileData?.degree} -  </p>
          <p className="text-md ml-1"> { doctorProfileData?.speciality}</p>
          <button className="border border-slate-400 rounded-full px-1 ml-2 text-sm">{doctorProfileData?.experience}</button>
        </div>

        <div>About: </div>
          {
            isEdit?<textarea  value={aboutMessage} onChange={(e) => { setAboutMessage(e.target.value) }} className= "rounded-md border-blue-400 border-2 outline-none px-1 w-[500px] h-[200px] text-slate-800" />:<p className="w-[600px] text-slate-800">{aboutMessage}</p>
          }

        <p className="my-2 text-md font-medium text-slate-600">Appointment Fee: ${isEdit?<input className="border-2 outline-none rounded-md border-blue-400" type="number" value={fees} onChange={(e) => { setFees(Number(e.target.value)) }}/>:<span>{fees}</span>}</p>
        <div className="flex text-slate-800 mb-2">
          <span>Address: </span>
          <span className="ml-1">
            {
              isEdit?<div className="flex flex-col gap-1">
                <input type="text" value={addressLine1} className="border-2 border-blue-400 rounded-lg outline-none" onChange={(e)  => { setAddressLine1(e.target.value) }}/>
                <input type="text" value={addressLine2} className="border-2 border-blue-400 rounded-lg outline-none" onChange={(e)=> { setAddressLine2(e.target.value) }}/>
              </div>:
              <div>
                <p>{addressLine1}</p>
                <p>{addressLine2}</p>
              </div>
            }
          </span>
        </div>
        {
          isEdit?<label className="">
            <input type="checkbox" checked={isAvailable} onChange={() => { 
              setIsAvailable(!isAvailable)
             }} />
            Available
            </label>:<label className="">
              <input type="checkbox" checked={doctorProfileData.available} readOnly/>
              Available
            </label>
        }
        <div>
        <button className="p-1 px-5 border rounded-full border-slate-800 text-slate-800 mt-6" onClick={saveHandler}>{isEdit?"Save":"Edit"}</button>
        </div>
      </div>
    </div>:<div>fetching data from the backend...</div>}
  </div>
  )
}
