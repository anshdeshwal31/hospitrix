import { useContext } from "react"
import { AdminContext} from "../context/AdminContext"
import { AppContext } from "../context/AppContext"
import { assets } from "../assets/admin/assets"

export const AdminDashboard = () => {
    const {adminDashData , getAdminDashData, adminLogin , deleteDoctor , addDoctor} = useContext(AdminContext)
    const { slotDateFormat } = useContext(AppContext)

    
    

    return (
      <div>

        <div className="">

          <div className="">
            <span className=""><img src={assets.doctor_icon} alt="" /></span>
            <span className="">
              <div className="">{adminDashData.doctors}</div>
              <div className="">Doctors</div>
            </span>
          </div>


          <div className="">
            <span className=""><img src={assets.appointments_icon} alt="" /></span>
            <span className="">
              <div className="">{adminDashData.appointments}</div>
              <div className="">Doctors</div>
            </span>
          </div>


          <div className="">
            <span className=""><img src={assets.patients_icon} alt="" /></span>
            <span className="">
              <div className="">{adminDashData.patients}</div>
              <div className="">Doctors</div>
            </span>
          </div>
        </div>

        <div className="">

        </div>

      </div>
    )
}
