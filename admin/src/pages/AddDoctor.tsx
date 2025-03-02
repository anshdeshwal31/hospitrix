import { useState } from "react";


export const AddDoctor = () => {


  const [Image , setImage]  = useState<boolean>(false);
  const [Email , setEmail] = useState<string>("");
  const [Name  , setName] = useState<string>("");
  const [Password, setPassword] = useState<string>("");
  const [experience , setExperience] = useState<number| null>(null)
  const [fees , setFees] = useState<number| null>(null);
  const [speciality , setSpeciality] = useState<string>("");
  const[about , setAbout] = useState<string>("");
  const [ degree , setDegree] = useState<string>("")
  const [address1 , setAddress1] = useState<string>("")
  const [address2 , setAddress2] = useState<string>("")

  return (
    <div className="w-full m-8">
      <div className="text-xl font-medium mb-6">Add Doctor </div>
      <form action="" className="border rounded-md p-4 text-lg text-slate-600 w-[70%]">

        <div className=" flex gap-6 w-full justify-around">
          <div className="flex flex-col gap-4 w-[45%]">

            <label htmlFor="" className="flex flex-col">
              Your name
              <input type="text" id="doctorname" name="doctorname" placeholder="Name" className="border rounded-md px-3 py-2"/>
            </label>

            <label htmlFor="" className="flex flex-col">
              Doctor Email
              <input type="text" className="border rounded-md px-3 py-2" placeholder="Email" id="doctoremail"/>
            </label>

            <label htmlFor="" className="flex flex-col">
              Set Password
              <input type="password" className="border rounded-md px-3 py-2" id="password" placeholder="Password" />
            </label>

            <label htmlFor="" className="flex flex-col">
              Experience
              <select name="experience" id="experience" className="border rounded-md px-3 py-2">
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
              <input type="number" className="border rounded-md px-3 py-2" placeholder="Fees"/>
            </label>


          </div>

          <div className="w-[45%] flex flex-col gap-4">

            <label htmlFor="" className="flex flex-col">
              Speciality
              <select name="speciality" id="speciality" className="border rounded-md px-3 py-2">
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
              <input type="text" className="border rounded-md px-3 py-2" placeholder="Degree"  />
            </label>

            <label htmlFor="" className="flex flex-col">
              Address
              <input type="text" className="border rounded-md px-3 py-2 mb-2"  placeholder="Address 1" />
              <input type="text" className="border rounded-md px-3 py-2" placeholder="Address 2" />
            </label>

          </div>
        </div>

        <div className=" mt-4">
          <label htmlFor="" className="flex flex-col ml-3 gap-2">
            About Doctor
            <textarea name="about" id="about" rows={6} cols={10} placeholder="Write  about the doctor" className="border rounded-md p-3"></textarea>
          </label>
        </div>

        <div className="ml-3 mt-6">
          <button className="bg-primary-blue py-3 px-9 text-white hover:bg-black transition-all duration-500 rounded-full">Add Doctor</button>
        </div>

      </form>
    </div>
  )
}