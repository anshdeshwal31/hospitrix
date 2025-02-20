import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AdminDashboard } from './pages/adminDashboard'
import { AppointmentList } from './pages/appointmentList'
import { DoctorList } from './pages/doctorList'
import { AddDoctor } from './pages/addDoctor'

const App = () => {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Navbar/>,
      errorElement: <div className=' text-center font-semibold text-3xl'>
                        Error loading page
                    </div>,
      children:[
        {
          index:true,
          element:<AdminDashboard/>
        },
        {
          path:"/admin-dashboard",
          element:<AdminDashboard/>
        },
        {
          path:"add-doctor",
          element:<AddDoctor/>
        },
        {
          path:"doctor-list",
          element:<DoctorList/>
        },
        {
          path:"appointment-list",
          element:<AppointmentList/>
        }
      ]
    }
  ])
  return (
    <div>
      <RouterProvider router= {router}/>
    </div>
  )
}

export default App