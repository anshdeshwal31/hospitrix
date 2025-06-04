import { useContext, useState, useEffect, useRef } from "react";
import { ImageUpload } from "../utils/imageUpload";
import { assets } from "../assets/admin/assets";
import { AdminContext } from "../context/AdminContext";
import { MdVisibility , MdVisibilityOff} from "react-icons/md";


export const AddDoctor = () => {

  const {addDoctor} = useContext(AdminContext)
  const [Email , setEmail] = useState<string>("");
  const [Name  , setName] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [experience , setExperience] = useState<string>("")
  const [fees , setFees] = useState<number| null>(null);
  const [speciality , setSpeciality] = useState<string>("");
  const[about , setAbout] = useState<string>("");
  const [ degree , setDegree] = useState<string>("")
  const [address1 , setAddress1] = useState<string>("")
  const [address2 , setAddress2] = useState<string>("")
  const[postImage , setPostImage] = useState<string>("")
  const imageRef = useRef<HTMLInputElement>(null)
  const[passwordVisible, setPasswordVisible] = useState<boolean>(false)


  const [doc, setDoc] = useState<any>({
                                      email:Email,
                                      password:Password,
                                      name:Name,
                                      image:postImage,
                                      speciality,
                                      degree ,
                                      experience,
                                      about ,
                                      available:true,
                                      fees,
                                      address:{
                                        line1:address1,
                                        line2:address2
                                      },
                                      dateAdded: new Date().toISOString()
                                    }) 


  useEffect(() => {
    setDoc({
      email: Email,
      password: Password,
      name: Name,
      image: postImage,
      speciality,
      degree,
      experience,
      about,
      available: true,
      fees,
      address: {
        line1: address1,
        line2: address2
      },
      dateAdded: new Date().toISOString()
    });
  }, [Email, Password, Name, postImage, speciality, degree, experience, about, fees, address1, address2]);

  const handleImageUpload = async (e:React.ChangeEvent<HTMLInputElement>) => { 
    try {
      const base64 = await ImageUpload(e)
      setPostImage(base64 as string)
    } catch (error) {
      console.log("Failed to upload image: ", error)
    }
  }
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => { 
    console.log("preventing the window from reloadingn 1")
    e.preventDefault()
    console.log("preventing the window from reloading 2")
    await addDoctor(doc)
    console.log("preventing the window from reloading 3")
   }
  
  return (

    <div className="w-[325px] sm:w-[500px] md:w-[600px] xl:w-[800px] lg:w-[700px] h-fit sm:mt-8 sm:ml-8 mt-4 ml-2 bg-blue-50 border border-slate-400 rounded-lg mb-6 ">

      
      <div className="text-2xl font-medium m-5 text-slate-700">Add Doctor </div>
      <form action="" className=" w-full border rounded-md p-4 text-lg text-slate-600  border-none " onSubmit={handleSubmit}>
        <div className="mb-5">
          <label>
            <img src={postImage?postImage:assets.upload_area} className="h-[70px] my-2 ml-3" />
            {/* <img src={imageRef?.current?.value?imageRef.current.value:assets.upload_area} className="h-[70px] my-2 ml-3" /> */}
            <input type="file" ref={imageRef} onChange={handleImageUpload} className="ml-4 w-[100%]"/>
          </label>
        </div>

        <div className=" flex gap-6 w-full justify-around sm:flex-row flex-col">
          <div className="flex flex-col gap-4 w-[85%] sm:w-[45%]">

            <label htmlFor="" className="flex flex-col">
              Your name
              <input required type="text" id="doctorname" name="doctorname" placeholder="Name" className="border rounded-md px-3 py-2" onChange={(e) => setName(e.target.value) }/>
            </label>

            <label htmlFor="" className="flex flex-col">
              Doctor Email
              <input required type="text" className="border rounded-md px-3 py-2" placeholder="Email" id="doctoremail" onChange={(e) => setEmail(e.target.value) }/>
            </label>

            <label htmlFor="" className="flex flex-col relative">
              Set Password 
              <input required type={passwordVisible?"text":"password"} className="border rounded-md px-3 py-2 pr-10" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value) }/>
              <span 
                className="absolute right-3 top-[40px] hover:cursor-pointer" 
                onClick={() => { setPasswordVisible(!passwordVisible) }}
              >
                {passwordVisible ? <MdVisibilityOff size={22}/> : <MdVisibility size={22}/>}
              </span>
            </label>

            <label htmlFor="" className="flex flex-col">
              Experience
              <select name="experience" id="experience" className="border rounded-md px-3 py-2 hover:cursor-pointer" onChange={(e) => setExperience(e.target.value)} defaultValue="1 year" >
                <option value="1 year">1 year</option>
                <option value="2 years">2 years</option>
                <option value="3 years">3 years</option>
                <option value="4 years">4 years</option>
                <option value="5 years">5 years</option>
                <option value="6 years">6 years</option>
                <option value="7 years">7 years</option>
                <option value="8 years">8 years</option>
                <option value="9 years">9 years</option>
                <option value="10 years">10 years</option>
              </select>
            </label>

            <label htmlFor="" className="flex flex-col">
              Fees
              <input required type="number" className="border rounded-md px-3 py-2" placeholder="Fees" onChange={(e) => setFees(parseInt(e.target.value))}/>
            </label>


          </div>

          <div className="w-[85%] sm:w-[45%] flex flex-col gap-4">

            <label htmlFor="" className="flex flex-col">
              Speciality
              <select name="speciality" id="speciality" className="border rounded-md px-3 py-2 hover:cursor-pointer" onChange={(e) => setSpeciality(e.target.value)} defaultValue="General Physician" >
                <option value="General Physician">General Physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </label>

            <label htmlFor="" className="flex flex-col">
              Degree
              <input required type="text" className="border rounded-md px-3 py-2" placeholder="Degree" onChange={(e) => setDegree(e.target.value)} />
            </label>

            <label htmlFor="" className="flex flex-col">
              Address
              <input required type="text" className="border rounded-md px-3 py-2 mb-2"  placeholder="Address 1" onChange={(e) => setAddress1(e.target.value)}/>
              <input required type="text" className="border rounded-md px-3 py-2" placeholder="Address 2" onChange={(e) => setAddress2(e.target.value)} />
            </label>

          </div>
        </div>

        <div className=" mt-4 mb-3">
          <label htmlFor="" className="flex flex-col ml-3 gap-2">
            About Doctor
            <textarea name="about" id="about" rows={6} cols={9} placeholder="Write  about the doctor" className="border rounded-md pb-0 p-3 mb-3" required onChange={(e) => setAbout(e.target.value)}></textarea>
          </label>
        </div>

        <div className="ml-3 mt-6 mb-2">
          <button type="submit" className="bg-primary-blue py-3 px-9 text-white hover:bg-black transition-all duration-500 rounded-full" >Add Doctor</button>
        </div>

      </form >
    </div>
  )
}