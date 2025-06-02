import { assets, specialityData} from '../assets/frontend/assets'
import { Link } from 'react-router-dom'
import { SpecialityType } from '../types/Types'
import { v4 as uuidv4 } from 'uuid'
import DoctorCard from '../components/DoctorCard'
import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'

const Home = () => {

    const {doctorList , getDoctorList} = useContext(UserContext)

    useEffect(() => { 
        getDoctorList()
     },[])
    
  return (
    <div className='w-full flex flex-col items-center mt-2 p-3 h-full'>
        <div className='w-[80%] bg-primary-blue rounded-xl flex flex-col md:flex-row  px-3 lg:px-12 md:justify-around text-white'>
            <div className='flex flex-col justify-center gap-4 mt-8 md:mt-14 '>
                <div className='text-3xl md:text-4xl xl:text-5xl  mb-4 font-semibold'>
                    Book Appointment <br />With Trusted Doctors
                </div>

                <div className='flex font-light justify-center text-sm md:text-md'>
                    <img src={assets.group_profiles} alt="" className='mr-3 h-[30px] sm:h-[40px] md:h-[50px]' />
                    Simply browse through our extensive list of trusted doctors,<br /> schedule your appointment hassle-free.
                </div>

                <div>
                    <Link to = "/"  >
                        <button className='bg-primary-pink text-white rounded-full flex gap-2 py-4 px-7 hover:bg-black transition duration-500 mt-1 mb-2 md:mt-3 text-lg' >
                            Book appointment 
                            <img src={assets.arrow_icon} alt="" className='self-center' />
                        </button>
                    </Link>
                </div>

            </div>

            <div className='w-[300px] sm:w-[400px] md:w-[600px] mt-24 md:justify-start mx-auto flex items-center justify-center '>
                <img src={assets.header_img} alt=""  className='w-[300px] sm:w-[500px] md:w-[600px]  md:self-end self-center -mx-2'/>
            </div>
        </div>

        <div className='text-4xl font-medium mt-16 '>Find by speciality</div>
        <div className='mt-4 text-center font-light'>Simply browse through our extensive list of trusted doctors, <br />schedule your appointment hassle-free.</div>

        <div className='flex justify-center gap-8 mt-10 font-light text-sm overflow-x-auto w-screen scrollbar-hide px-1 overflow-y-visible pt-2'>
            {specialityData.map((specialityItem: SpecialityType ) => { 
                return (
                    <div key = {uuidv4()} className='flex flex-col transform hover:-translate-y-2 transition duration-500  relative z-10 '>
                        <Link to={`doctors/${specialityItem.speciality}`} className='self-center'>
                            <img src={specialityItem.image} alt="" className='w-[60px] sm:w-[70px] md:w-[90px] lg:w-[110px] self-center ' />
                        </Link>
                         <span className='self-center'>{specialityItem.speciality}</span>
                    </div>
                ) 
            })}
        </div>

        <div className='text-4xl mt-24 font-medium'>Top Doctors to Book</div>
        <div className='mt-4'>Simply browse through our extensive list of trusted doctors.</div>
        

        <div className='flex gap-x-4 gap-y-8 flex-wrap justify-center w-[82%] mt-7 '>
            {doctorList.slice(0,10).map((doctorItem:any) => { 
                return (
                <div key={doctorItem._id}>
                    <DoctorCard name = {doctorItem.name} image = {doctorItem.image} speciality={doctorItem.speciality} _id = {doctorItem._id}/>
                </div>
                )
                })
            }
        </div>

        <Link to="/doctors"><button className='border rounded-full bg-blue-100 text-gray-600 py-3 px-12 text-lg my-12'>more</button></Link >

        <div className='flex gap-10 sm:gap-0 sm:flex-row flex-col bg-primary-blue w-[80%] text-white  justify-around rounded-xl mt-14'>
            <div className='flex flex-col justify-center items-center sm:items-start gap-5 px-2  '>
                <div className='text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-medium'>
                    Book Appointment <br /> With 100+ Trusted Doctors
                </div>
                <div>
                    <button className=' bg-primary-pink rounded-full px-8 py-3 text-sm sm:text-lg transform hover:scale-110 transition duration-300'>Create account</button>
                </div>
            </div>

            <div className='sm:flex justify-center hidden sm:visible'>
                <img src={assets.appointment_img} alt="" className=' h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] md:h-[350px] md:w-[350px] lg:h-[450px] lg:w-[450px] -mt-8' />
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