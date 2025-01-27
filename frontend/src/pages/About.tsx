import { assets } from "../assets/frontend/assets"

const About = () => {
  return (
    <div className="w-[80%] ml-36 flex flex-col justify-center gap-8 mt-16">

      <div className="text-3xl text-slate-800 font-medium self-center"><span className="text-slate-600 mx-1 ">  ABOUT</span> US </div>

      <div className="flex gap-16">

        <div className="">
          <img src={assets.about_image} className="w-[420px]"/>
        </div> 

        <div className="w-1/2 flex flex-col gap-6 text-slate-500 justify-center">
          <div className="">
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </div>

          <div className="">
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
          </div>

          <div className="text-black font-semibold">Our Vision</div>

          <div className="">
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
          </div>

        </div>

      </div>

      <div className=" text-2xl font-semibold text-slate-600 mt-4"><span className="font-normal text-black">WHY</span> CHOOSE US</div>
      
      <div className="flex w-full">

        <div className=" w-1/3 border border-black p-[70px] flex flex-col hover:cursor-pointer hover:border-white hover:text-white  hover:bg-primary-pink transition duration-500 text-slate-700">
          <div className="mb-4 font-semibold ">EFFICIENCY:</div>
          <div className="">Streamlined appointment scheduling <br />that fits into your busy lifestyle.</div>
        </div>

        <div className="w-1/3 border border-black p-[70px] flex flex-col hover:cursor-pointer hover:border-white hover:text-white  hover:bg-primary-pink transition duration-500 text-slate-700">
          <div className="mb-4 font-semibold">CONVENIENCE:</div>
          <div className="">Access to a network of trusted <br /> healthcare professionals in your area.</div>
        </div>

        <div className="w-1/3 border border-black p-[70px] flex flex-col hover:cursor-pointer hover:border-white hover:text-white  hover:bg-primary-pink transition duration-500 text-slate-700">
          <div className="mb-4 font-semibold">PERSONALIZATION:</div>
          <div className="">Tailored recommendations and reminders to <br />help you stay on top of your health.</div>
        </div>

      </div>


    </div>
  )
}

export default About