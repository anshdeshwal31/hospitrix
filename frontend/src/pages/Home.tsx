import { assets, specialityData , doctors} from '../assets/frontend/assets'
import { Link } from 'react-router-dom'
import { SpecialityType } from '../types/Types'
import { v4 as uuidv4 } from 'uuid'
import DoctorCard from '../components/DoctorCard'

const Home = () => {
  return (
    <div className='w-full flex flex-col items-center mt-2 p-3 h-full'>
        <div className='w-[80%] bg-primary-blue rounded-xl flex px-12 justify-between text-white'>
            <div className='flex flex-col justify-center gap-4 mt-14 '>
                <div className='text-5xl  mb-4 font-semibold'>
                    Book Appointment <br />With Trusted Doctors
                </div>

                <div className='flex font-light justify-center'>
                    <img src={assets.group_profiles} alt="" className='mr-3' />
                    Simply browse through our extensive list of trusted doctors,<br /> schedule your appointment hassle-free.
                </div>

                <div>
                    <Link to = "/"  >
                        <button className='bg-primary-pink text-white rounded-full flex gap-2 py-4 px-7 hover:bg-black transition duration-500 mt-3 text-lg' >
                            Book appointment 
                            <img src={assets.arrow_icon} alt="" className='self-center' />
                        </button>
                    </Link>
                </div>

            </div>

            <div className='w-[50%] mt-24'>
                <img src={assets.header_img} alt=""  className='w-full'/>
            </div>
        </div>

        <div className='text-4xl font-medium mt-16 '>Find by speciality</div>
        <div className='mt-4 text-center font-light'>Simply browse through our extensive list of trusted doctors, <br />schedule your appointment hassle-free.</div>

        <div className='flex justify-center gap-8 mt-10 font-light text-sm'>
            {specialityData.map((specialityItem: SpecialityType ) => { 
                return (
                    <div key = {uuidv4()} className='flex flex-col transform hover:-translate-y-2 transition duration-500 '>
                        <Link to={`doctors/${specialityItem.speciality}`}>
                            <img src={specialityItem.image} alt="" className='w-[110px]' />
                        </Link>
                         <span className='self-center'>{specialityItem.speciality}</span>
                    </div>
                ) 
            })}
        </div>

        <div className='text-4xl mt-24 font-medium'>Top Doctors to Book</div>
        <div className='mt-4'>Simply browse through our extensive list of trusted doctors.</div>
        

        <div className='flex gap-x-4 gap-y-8 flex-wrap justify-center w-[82%] mt-7 '>
            {doctors.slice(0,10).map((doctorItem) => { 
                return (
                <div key={doctorItem._id}>
                    <DoctorCard name = {doctorItem.name} image = {doctorItem.image} speciality={doctorItem.speciality} _id = {doctorItem._id}/>
                </div>
                )
                })
            }
        </div>

        <Link to="/doctors"><button className='border rounded-full bg-blue-100 text-gray-600 py-3 px-12 text-lg my-12'>more</button></Link >

        <div className='flex bg-primary-blue w-[80%] text-white  justify-around rounded-xl mt-14'>
            <div className='flex flex-col justify-center gap-5'>
                <div className='text-6xl font-medium'>
                    Book Appointment <br /> With 100+ Trusted Doctors
                </div>
                <div>
                    <button className='bg-primary-pink rounded-full px-8 py-3 text-lg transform hover:scale-110 transition duration-300'>Create account</button>
                </div>
            </div>

            <div>
                <img src={assets.appointment_img} alt="" className='h-[450px] -mt-8' />
            </div>
        </div>
    </div>
  )
}

export default Home




















































































// Operating system 

// multiprogramming: definition: the ability of an operating system to execute more than one program on the same computer at the same time.
// Example: a computer running a web browser while playing music and downloading a file.

// multitasking with example: definition: the ability of an operating system to execute more than one task at the same time. Example: a computer running an email program while editing a document and reading a web page.

// the difference and similarities between multiprogramming and multitasking in detail: Multiprogramming is the ability of an operating system to execute more than one program on the same computer at the same time. Multitasking is the ability of an operating system to execute more than one task at the same time. The main difference between the two is that multiprogramming involves running multiple programs simultaneously, while multitasking involves running multiple tasks simultaneously. However, both concepts involve the ability to perform multiple operations at the same time, which can improve efficiency and productivity.


// multiprocessing operating system: definition: an operating system that supports the execution of multiple processes on a single computer. Example: a computer running multiple instances of a program to perform different tasks simultaneously.