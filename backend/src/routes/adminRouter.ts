import express,{Router} from "express";
import { AdminLoginController } from "../controllers/adminControllers/loginController";
import { AddDoctorController } from "../controllers/adminControllers/addDoctorController";
import { CancelAppointmentController } from "../controllers/adminControllers/cancelAppointmentController";
import { DeleteDoctorController } from "../controllers/adminControllers/deleteDoctorController";
import { EditDoctorController } from "../controllers/adminControllers/editDoctorController";
import { GetDoctorsList } from "../controllers/adminControllers/getDoctorsList";
import { GetAdminDashboardData } from "../controllers/adminControllers/getAdminDashboardData";
import { GetAppointmentList } from "../controllers/adminControllers/getAppointmentsList";
import { AuthAdminMiddleware } from "../middlewares/authAdmin";

export const adminRouter:Router = express.Router();

// user routes
adminRouter.post("/login",AdminLoginController)

adminRouter.use(AuthAdminMiddleware)

adminRouter.post("/addDoctor", AddDoctorController)

adminRouter.post("/cancelAppointment", CancelAppointmentController)

adminRouter.post("/deleteDoctor",DeleteDoctorController)

adminRouter.post("/editDoctor", EditDoctorController)

adminRouter.get("/getDoctorsList", GetDoctorsList)

adminRouter.get("/getAdminDashboardData", GetAdminDashboardData)

adminRouter.get("/getAppointmentList", GetAppointmentList)