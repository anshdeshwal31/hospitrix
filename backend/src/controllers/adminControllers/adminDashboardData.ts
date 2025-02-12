import { AppointmentModel } from "../../models/appointmentsModel"
import { DoctorModel } from "../../models/doctorModel"
import { UserModel } from "../../models/userModel"
import { Response , Request  , NextFunction
 } from "express";

// API to get dashboard data for admin panel
export const AdmindDashboardData = async (req:Request , res:Response) => {
    try {
        const doctors = await DoctorModel.find({})
        const users = await UserModel.find({})
        const appointments = await AppointmentModel.find({})

        const dashboardData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashboardData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, error })
    }
}