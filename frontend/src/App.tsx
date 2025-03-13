import {createBrowserRouter, RouterProvider} from "react-router-dom"
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Navbar from './components/Navbar';  
import Home from './pages/Home';           
import Contact from './pages/Contact';     
import About from './pages/About';         
import Doctors from './pages/Doctors';     
import Login from './pages/Login';         
// import CreateAccount from './pages/CreateAccount'; 
import Appointment from './pages/Appointment';
import { ProtectedRoute } from "./components/ProtectedRoute";

const App = () => {
      const router = createBrowserRouter([{
        path: '/',
        element: <Navbar/>,
        errorElement: <div className=' text-center font-semibold text-3xl'>
                        Error loading page
                      </div>,
        children: [
          {
          path: '/home',
          element: <Home/>},
          
          {
            path:"/contact",
            element:<Contact/>
          },
          {
            path:"/about",
            element:<About/>
          },
          {
            path:"/doctors",
            element:<Doctors/>
          },
          {
            path:"/login",
            element:<Login/>
          },
          // {
          //   path:"/createAccount",
          //   element:<CreateAccount/>
          // },
          {
            path:"/my-appointments",
            element:<ProtectedRoute><MyAppointments/></ProtectedRoute>
          },
          {
            path:"/my-profile",
            element:<ProtectedRoute><MyProfile/></ProtectedRoute>
          },
          {
            path: "/doctors/:speciality",
            element: <Doctors/>
          },
          {
            path: "/appointment/:docId",
            element:<Appointment/>
          }

        ]
      }])

      return (
        <div>
          <RouterProvider router = {router}/>
        </div>
      )
}

export default App