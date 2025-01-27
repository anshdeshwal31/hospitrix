import { NavLink , Outlet} from 'react-router-dom';
import { assets } from '../assets/frontend/assets'
import Footer from './Footer';

const Navbar = () => {
  return (
    <div className='flex flex-col'>
    <div className='flex gap-x-6 justify-around mt-5'>
        <div>
            <NavLink to="/"><img src={assets.logo} alt="" /></NavLink>
        </div>

        <div className='flex gap-x-8 text-md font-medium self-center'>
            <NavLink to="/" className={({isActive}) => `${isActive?"underline decoration-primary-blue decoration-2 underline-offset-8 ":""}`}>
                HOME
            </NavLink>

            <NavLink to= "/doctors" className={({isActive}) =>  `${isActive?"underline decoration-primary-blue decoration-2 underline-offset-8 ":""}` }>
                ALL DOCTORS
            </NavLink>

            <NavLink to="/about" className={({isActive}) =>  `${isActive?"underline decoration-primary-blue decoration-2 underline-offset-8 ":""}` }>
                ABOUT
            </NavLink>

            <NavLink to="/contact" className={({isActive}) =>  `${isActive?"underline decoration-primary-blue decoration-2 underline-offset-8 ":""}` }>
                CONTACT
            </NavLink>

            <NavLink to = "adminPanel" >
                <button className=' border rounded-2xl px-5 font-normal text-sm py-1'>Admin Panel</button>
            </NavLink>
    
        </div>

        <div>
            <NavLink to = "login">
                <button className='bg-primary-pink rounded-full  px-10 py-3 text-white'>Create Account</button>
            </NavLink>
        </div>
    </div>
    <hr className='m-4  w-[86%] border-slate-400 self-center'/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Navbar