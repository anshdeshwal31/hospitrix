import express , {Router} from "express"
import { CancelAppointmentController } from "../controllers/doctorControllers/cancelAppointmentController"
import { CompletedAppointmentController } from "../controllers/doctorControllers/completedAppointmentController"
import { EditDoctorController } from "../controllers/doctorControllers/editProfileController"

export const doctorRouter:Router  = express.Router()

// doctor routes 
doctorRouter.post("/cancelAppointment",CancelAppointmentController)

doctorRouter.post("completedAppointment",CompletedAppointmentController)

doctorRouter.post("editDoctorProfile",EditDoctorController)