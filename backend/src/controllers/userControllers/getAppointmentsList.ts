import { Request, Response ,NextFunction } from "express";
import { AppointmentModel } from "../../models/appointmentsModel";
import {z} from 'zod'
import { parse } from "path";

export const ListAppointment = async (req:Request, res:Response , next:NextFunction) => {
    const parsedDataWithSuccess = z.object({userId:z.string().regex(/^[0-9a-fA-F]{24}$/)}).safeParse(req.body)
    if(parsedDataWithSuccess.success){
        try {
            const { userId } = parsedDataWithSuccess.data
            const appointments = await AppointmentModel.find({ userId })

            res.json({ success: true, appointments })

        } catch (error) {
            console.log(error)
            res.json({ success: false, error })
        }
    }
    else{
        res.status(400).json({
            success:false ,
            message: "incorrect format , try again"
        })
    }
}
