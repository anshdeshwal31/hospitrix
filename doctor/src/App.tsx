import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AppointmentList } from './pages/AppointmentList'
import { DoctorDashboard } from './pages/DoctorDashboard'
import { DoctorLogin } from './pages/DoctorLogin'
import { DoctorProfile } from './pages/DoctorProfile'
import { ToastContainer } from 'react-toastify'

function App() {
  const router = createBrowserRouter([
    {
      path:"login",
      element:<DoctorLogin/>
    },
    {
    path:'/',
    element:<Navbar/>,
    errorElement:<div className='text-center font-semibold text-3xl'>Error loading page</div>,
    children:[
      {
        path:'/doctor-dashboard',
        element:<DoctorDashboard/>
      },
      {
        path:'appointment-list',
        element:<AppointmentList/>
      },
      {
        path:'my-profile',
        element:<DoctorProfile/>
      }
    ]
  }])


  return (
    <div>
      <RouterProvider router= {router}/>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App
