import { createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { AdminDashboard } from './pages/AdminDashboard'
import { AddDoctor } from './pages/AddDoctor'
import { DoctorList } from './pages/DoctorList'
import { AppointmentList } from './pages/AppointmentList'
import { AdminLogin } from './pages/AdminLogin'
import { ToastContainer } from 'react-toastify'

// const ProtectedRoute = ({children}:{children:ReactNode}) => { 
//   const{aToken} = useContext(AdminContext)
//   if(!aToken) {
//     return <Navigate to="/login" replace/>
//   }
//   return children
//  }

const App = () => {
  const router = createBrowserRouter([
    {
      path:"login",
      element:<AdminLogin/>
    },
    {
      path:"/",
      // element:<ProtectedRoute><Navbar/></ProtectedRoute>,
      element:<Navbar/>,
      errorElement: <div className=' text-center font-semibold text-3xl'>
                        Error loading page
                    </div>,
      children:[
        // {
        //   index:true,
        //   element:<AdminDashboard/>
        // },
        {
          path:"admin-dashboard",
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
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default App