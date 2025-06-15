import { assets } from "../assets/frontend/assets"

const Contact = () => {
  return (
    <div className="w-full flex flex-col items-center gap-10">
      
      <div className="text-3xl mt-8 font-medium text-slate-200]">CONTACT <span className="text-slate-600 mx-1"> US</span></div>
      
      <div className="flex md:flex-row flex-col gap-12">
        <div className=""> <img src={assets.contact_image} className="w-[350px] sm:w-[400px]" /></div>

        <div className="flex flex-col gap-8 p-3 text-slate-600 ">
          <div className="text-xl text-slate-600 font-semibold">OUR OFFICE</div>

          <div className="">
            00000 Willms Station <br />
            Suite 000, Washington, USA
          </div>
          
          <div className="">
            Tel: (000) 000-0000 <br />
            Email: greatstackdev@gmail.com
          </div>
          
          <div className="font-semibold text-xl">CAREERS AT HOSPITRIX</div>
          <div className="">Learn more about our teams and job openings.</div>

          <div className="">
            <button className="border border-black py-4 px-8 hover:bg-primary-pink hover:text-white transition duration-500 hover:border-white">Explore Jobs</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Contact