import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Login = () => {
  const {userLogin, createUserAccount , name , email, setName , setEmail , password , setPassword} = useContext(UserContext)
  const [state, setState] = useState('Sign Up')
  const [passwordVisible , setPasswordVisible] = useState(false)

  const navigate = useNavigate()

  const onSubmitHandler = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("executing on submit handler ")
    if(state == "Sign Up"){
      const success = await createUserAccount(name, email , password);
      if(success === true){
        
        navigate("/",{state:{
          name,email,password,
          navigatedFromCreateAccount:true
        }})
        console.log("navigating to the home page")
      }
      else{
        console.log(success)
        console.log("couldn't create the account")
      }

    } else {
      console.log("executing the user login function")
      const loginSuccessfull:boolean = userLogin(email, password)
      navigate("/")
      loginSuccessfull?navigate("/"):""
    } 
    
  }
  return (
    <div className='flex flex-col items-center'>

    <form onSubmit={onSubmitHandler} className='mt-[120px] mb-[20px] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-md shadow-lg '>
        <p className='text-2xl font-semibold text-black'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        {state === 'Sign Up'
          && <div className='w-full '>
            <p>Full Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
          </div>
        
        }
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type={passwordVisible?"text":"password"} required />
          <span className='relative -top-8 left-[290px]' onClick={() => { setPasswordVisible(!passwordVisible) }}>{passwordVisible?<MdVisibilityOff size={20}/>:<MdVisibility size={20}/>}</span>
        </div>
        <button className='bg-primary-blue text-white w-full py-2 my-2 rounded-md text-base hover:bg-primary-pink transition duration-500' type='submit'>{state === 'Sign Up' ? 'Create account' : 'Login'}</button>
        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary-blue underline cursor-pointer'>Login here</span></p>
          : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary-blue underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>

    <div className='flex gap-3'>
      <a href="http://localhost:5175/login"><button className='border rounded-lg px-8 py-3  text-slate-400 bg-black'>Doctor Login</button></a>
      <a href="http://localhost:5174/login"><button className='border rounded-lg px-8 py-3  text-slate-400 bg-black'>Admin Login</button></a>
    </div>
    </div>
  )
}

export default Login