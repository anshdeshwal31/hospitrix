import express,{Router} from "express";
import { AdminLoginController } from "../controllers/adminControllers/loginController";
import { AddDoctorController } from "../controllers/adminControllers/addDoctorController";
import { CancelAppointmentController } from "../controllers/adminControllers/cancelAppointmentController";
import { DeleteDoctorController } from "../controllers/adminControllers/deleteDoctorController";
import { EditDoctorController } from "../controllers/adminControllers/editDoctorController";

export const adminRouter:Router = express.Router();

// user routes
adminRouter.post("/login",AdminLoginController)

adminRouter.post("/addDoctor",AddDoctorController)

adminRouter.post("/cancelAppointment", CancelAppointmentController)

adminRouter.post("deleteDoctor",DeleteDoctorController)

adminRouter.post("editDoctor", EditDoctorController)