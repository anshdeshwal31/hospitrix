import express , {Router} from "express"
import { GetAppointmentList } from "../controllers/doctorControllers/getAppointmentList"
import { GetDoctorProfile } from "../controllers/doctorControllers/getDoctorProfile"
import { GetDoctorList } from "../controllers/doctorControllers/getDoctorList"
import { DoctorLoginController } from "../controllers/doctorControllers/loginController"
import { ChangeDoctorAvailablity } from "../controllers/doctorControllers/changeDoctorAvailablity"
import { CancelAppointmentController } from "../controllers/doctorControllers/cancelAppointmentController"
import { CompletedAppointmentController } from "../controllers/doctorControllers/completedAppointmentController"
import { EditDoctorController } from "../controllers/doctorControllers/editProfileController"
import { GetDoctorDashboard } from "../controllers/doctorControllers/getDoctorDashboard"
import { AuthDoctorMiddleware } from "../middlewares/authDoctor"

export const doctorRouter:Router  = express.Router()

// doctor routes 
doctorRouter.post("/login",DoctorLoginController)

doctorRouter.use(AuthDoctorMiddleware)

doctorRouter.post("/cancelAppointment",CancelAppointmentController)

doctorRouter.post("/completedAppointment",CompletedAppointmentController)

doctorRouter.post("/editDoctorProfile",EditDoctorController)

doctorRouter.post("/changeDoctorAvailablity",ChangeDoctorAvailablity)


doctorRouter.get("/getAppointmentList",GetAppointmentList)

doctorRouter.get("/getDoctorProfile",GetDoctorProfile)

doctorRouter.get("/getDoctorList",GetDoctorList)

doctorRouter.get("/getDoctorDashboard",GetDoctorDashboard)