import { assets } from "../assets/frontend/assets"


const Footer = () => {
  return (
    <div className="mt-40 w-full">

        <div className="w-full flex-col sm:flex-row flex gap-16 items-center md:gap-0 md:justify-around ">
            <div className=" w-[300px] sm:w-[30%] flex flex-col gap-5">
                <img src={assets.logo} alt="" className="h-[40px] self-start sm:self-start"/>
                <span className=" font-light ">
                Hospitrix is your trusted healthcare management platform, connecting patients with qualified doctors for seamless appointment booking and medical consultations. We are committed to making healthcare accessible, efficient, and patient-centered through innovative digital solutions.
                </span>
            </div>


            <div className="flex justify-around w-[40%] gap-6 md:gap-16 flex-col sm:flex-row">
                <div className="flex flex-col gap-2 font-light ">
                    <div className="text-2xl font-medium mb-2">COMPANY</div>
                    <div>Home</div>
                    <div>About us</div>
                    <div>Delivery</div>
                    <div>Privacy Policy</div>
                </div>

                <div className="flex flex-col gap-2 font-light">
                    <div className="text-2xl font-medium mb-2">GET IN TOUCH</div>
                    <div>+0-000-000-000</div>
                    <div>anshdeshwal1234@gmail.com</div>
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center mt-6 gap-3">
            <hr className="w-3/4 self-center" />
            <div className="self-center">Copyright 2024 @ ansh.dev - All Right Reserved.</div>
        </div>

    </div>
  )
}

export default Footer