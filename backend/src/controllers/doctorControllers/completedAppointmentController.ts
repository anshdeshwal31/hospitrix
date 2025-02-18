import { Request , Response , NextFunction } from "express"
import { z } from "zod";
import { AppointmentModel } from "../../models/appointmentsModel";
import { Types } from "mongoose";

export const CompletedAppointmentController = async(req:Request , res:Response , next:NextFunction) => { 
    const parsedDataWithSuccess= z.object({
        appointmentId: z.string().regex(/^[0-9a-fA-F]{24}$/)
    }
).safeParse(req.body)

if (parsedDataWithSuccess.success) {
        try {
            await AppointmentModel.updateOne(
                {_id:new Types.ObjectId(parsedDataWithSuccess.data.appointmentId)},
                {$set:{isCompleted:true , isPending:false }}
            )
            return res.status(200).json({
                success: true,
                message: "Appointment marked as completed"
            })
            
        } catch (error) {
            console.log(error)
            res.status(500).json({
                success:false ,
                error
            })
        }

    } else {
        res.status(400).json({
            success:false ,
            message: "incorrect format , try again"
        })
    }
}