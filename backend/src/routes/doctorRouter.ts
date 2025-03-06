import express , {Router} from "express"
import { GetAppointmentList } from "../controllers/doctorControllers/getAppointmentList"
import { GetDoctorProfile } from "../controllers/doctorControllers/getDoctorProfile"
import { GetDoctorList } from "../controllers/doctorControllers/getDoctorList"
import { ChangeDoctorAvailablity } from "../controllers/doctorControllers/changeDoctorAvailablity"
import { CancelAppointmentController } from "../controllers/doctorControllers/cancelAppointmentController"
import { CompletedAppointmentController } from "../controllers/doctorControllers/completedAppointmentController"
import { EditDoctorController } from "../controllers/doctorControllers/editProfileController"
import { GetDoctorDashboard } from "../controllers/doctorControllers/getDoctorDashboard"
import { AuthDoctorMiddleware } from "../middlewares/authDoctor"
import { DoctorLoginController } from "../controllers/doctorControllers/loginController"

export const doctorRouter:Router  = express.Router()

// doctor routes 
doctorRouter.post("/login",DoctorLoginController)

doctorRouter.use(AuthDoctorMiddleware)

doctorRouter.post("/cancelAppointment",CancelAppointmentController)

doctorRouter.post("/completeAppointment",CompletedAppointmentController)

doctorRouter.post("/editDoctorProfile",EditDoctorController)

doctorRouter.post("/changeDoctorAvailablity",ChangeDoctorAvailablity)


doctorRouter.post("/getAppointmentList",GetAppointmentList)

doctorRouter.post("/getDoctorProfile",GetDoctorProfile)

doctorRouter.post("/getDoctorList",GetDoctorList)

doctorRouter.post("/getDoctorDashboard",GetDoctorDashboard)