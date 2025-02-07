import { AppointmentModel } from "../models/appointmentsModel"
import { Request , Response , NextFunction } from "express"
import {Types} from "mongoose"
import { z} from "zod"

export const CancelAppointmentController = async (req:Request , res:Response , next : NextFunction) => { 
    const cancelAppointmentInfoFormat = z.object({
        appointmentId :z.string().regex(/^[0-9a-fA-F]{24}$/),
    })

    const parsedDataWithSuccess = await cancelAppointmentInfoFormat.safeParse(req.body)

    if(parsedDataWithSuccess.success){
        try {
            AppointmentModel.deleteMany({
                appointmentId : new Types.ObjectId(parsedDataWithSuccess.data.appointmentId)
            })

            res.json({
                success: true , 
                message: "appointment cancelled successfully"
            })
        } catch (error) {
            res.json({
                success: false ,
                error
            })
        }
    }
    else{

    }
}