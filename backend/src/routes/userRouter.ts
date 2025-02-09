import express, {Router} from "express"
import { UserLoginController } from "../controllers/userControllers/loginController";
import { PayOnlineController } from "../controllers/userControllers/payOnlineController";
import { CancelAppointmentController } from "../controllers/userControllers/cancelAppointmentController";
import { SaveInformationController } from "../controllers/userControllers/saveInformationController";
import { BookAppointmentController } from "../controllers/userControllers/bookAppointmentController";


export const userRouter:Router = express.Router()

// authorization routes
userRouter.post("/login",UserLoginController);

// usablity routes
userRouter.post("/bookAppointment",BookAppointmentController);

userRouter.post("/payOnline",PayOnlineController);

userRouter.post("/cancelAppointment", CancelAppointmentController);

userRouter.post("/saveInformation",SaveInformationController);