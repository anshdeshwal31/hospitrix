import { useContext } from "react"
import { DoctorContext } from "../context/DoctorContext"
import { assets } from "../assets/assets"

export const DoctorDashboard = () => {
  const {doctorDashboardData} = useContext(DoctorContext)
  
  return (
    <div>
      <div>


        <div>
          <img src={assets.earning_icon} alt="" />
          <span>
            <p>$ {doctorDashboardData.earnings}</p>
            <p>Earnings</p>
          </span>
        </div>


        <div></div>
        <div></div>
      </div>

      <div></div>
    </div>
  )
}
