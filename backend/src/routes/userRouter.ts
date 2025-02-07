import express, {Router} from "express"
import { LoginController } from "../controllers/loginController"
import { BookAppointmentController } from "../controllers/bookAppointmentController";
import { CancelAppointmentController } from "../controllers/cancelAppointmentController";
import { PayOnlineController } from "../controllers/payOnlineController";
import { SaveInformationController } from "../controllers/saveInformationController";


export const userRouter:Router = express.Router()

// authorization routes
userRouter.post("/login",LoginController);

// usablity routes
userRouter.post("/bookAppointment",BookAppointmentController);

userRouter.post("/payOnline",PayOnlineController);

userRouter.post("/cancelAppointment", CancelAppointmentController);

userRouter.post("/saveInformation",SaveInformationController);