import { AppointmentModel } from "../../models/appointmentsModel"
import { Request , Response , NextFunction } from "express"
import {deleteModel, Types} from "mongoose"
import { z} from "zod"
import { DoctorModel } from "../../models/doctorModel"

export const CancelAppointmentController = async (req:Request , res:Response , next : NextFunction) => { 
    const cancelAppointmentInfoFormat = z.object({
        appointmentId :z.string().regex(/^[0-9a-fA-F]{24}$/),
    })

    const parsedDataWithSuccess = await cancelAppointmentInfoFormat.safeParse(req.body)

    if(parsedDataWithSuccess.success){
        try {
            await AppointmentModel.deleteOne({
                _id : new Types.ObjectId(parsedDataWithSuccess.data.appointmentId)
            })

            await DoctorModel.updateOne(
                {_id: parsedDataWithSuccess.data.appointmentId},
                {$unset:{[`slots_booke.${parsedDataWithSuccess.data.appointmentId}`]:""}}
            )
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
        res.json({
            success: false,
            message: "the format was incorrect , try again."
        })
    }
}