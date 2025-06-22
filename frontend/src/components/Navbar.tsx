import { NavLink , Outlet, useLocation} from 'react-router-dom';
import { assets } from '../assets/frontend/assets'
import Footer from './Footer';
import { useContext,useState } from 'react';
import { UserContext } from '../context/UserContext';
import { Dropdown } from './Dropdown';

const Navbar = () => {
    const {isLoggedIn , setIsHover , userProfile} = useContext(UserContext)
    const [showMenu , setShowMenu] = useState<boolean>(false);
    const path = useLocation().pathname;
    
    console.log("user profile from the backend", userProfile)
    // console.log("user profile image from the backend",userProfile.image)
  return (
    <div className='flex flex-col'>
    <div className='flex gap-x-6 md:justify-around justify-between mt-5  px-4'>
        <div className='self-start'>
            <NavLink to="/"><img src={assets.logo} className='h-12' alt="" /></NavLink>
        </div>

        <div className='md:flex gap-x-8 text-md font-medium self-center md:visible hidden'>
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

            <a href="https://hospitrix-admin.onrender.com/login">
                <button className=' border rounded-2xl px-5 font-normal text-sm py-1'>Admin Panel</button>
            </a>
    
        </div>
        <div className='flex gap-4'>

        {
            (isLoggedIn && path!="/login") && (
                <div 
                className="self-end"
                onMouseEnter={() => { setIsHover(true) }} 
                onMouseLeave={() => { setIsHover(false) }}
                >
                    <img 
                        src={userProfile.image?userProfile.image:assets.upload_area} 
                        className='rounded-full w-[50px] hover:cursor-pointer h-[50px] object-cover object-top' 
                        alt="" 
                    />
                    
                    <Dropdown />
                </div>
            )
        }


        <div>{<img src={assets.menu_icon} onClick={() => { setShowMenu(true) }} alt="" className='md:hidden mt-2 mr-4 hover:cursor-pointer' />}


            {/* SHOW MENU SECTION */}
            <div className={`bg-white transition-all md:hidden duration-500 text-slate-600  top-0 left-0 fixed  overflow-hidden z-50 ${showMenu?"w-screen h-screen visible ":" w-0 h-screen "}`}>
                <div className='flex justify-between'> 
                    <NavLink to="/">
                        <img src={assets.logo} className='h-12 m-3' alt="" /> 
                    </NavLink>
                    <img src={assets.cross_icon} onClick={() => { setShowMenu(false) }} alt="" className='hover:cursor-pointer h-12 m-3 mx-7' />
                </div>
                <div className='flex flex-col text-xl font-medium text-slate-700 gap-3 justify-center items-center mt-11'> 

                    <NavLink onClick={() => { setShowMenu(false) }} to="/" className="hover:bg-primary-blue hover:shadow-lg hover:text-white transition-all duration-500 p-2 px-3 rounded-lg">HOME</NavLink>
                    
                    <NavLink onClick={() => { setShowMenu(false) }} to="/doctors" className="hover:bg-primary-blue hover:shadow-lg hover:text-white transition-all duration-500 p-2 px-3 rounded-lg">ALL DOCTORS</NavLink>
                    
                    <NavLink onClick={() => { setShowMenu(false) }} to="/about" className="hover:bg-primary-blue hover:shadow-lg hover:text-white transition-all duration-500 p-2 px-3 rounded-lg">ABOUT</NavLink>

                    <NavLink onClick={() => { setShowMenu(false) }} to="/contact" className="hover:bg-primary-blue hover:shadow-lg hover:text-white transition-all duration-500 p-2 px-3 rounded-lg">CONTACT</NavLink>

                    <a href="https://hospitrix-admin.onrender.com/login">
                        <button className=' border-slate-400 border rounded-2xl px-5 font-normal text-sm py-1 mt-1 hover:bg-primary-blue hover:text-white transition-all duration-500'>Admin Panel</button>
                    </a>
                    
                </div>
            </div>
        </div>
        </div>
        {
            !isLoggedIn &&(
                <div>
                    <NavLink to = "login">
                        <button className='bg-primary-pink rounded-full  px-10 py-3 text-white'>Create Account</button>
                    </NavLink>
                </div>
            )
        }
    </div>
    <hr className='m-4  w-[86%] border-slate-400 self-center'/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default Navbar