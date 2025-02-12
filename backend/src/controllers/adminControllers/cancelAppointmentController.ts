import {z} from "zod"
import { AppointmentModel } from "../../models/appointmentsModel"
import {Types} from 'mongoose'
import { Request,Response ,NextFunction } from "express"
import { DoctorModel } from "../../models/doctorModel"

export const CancelAppointmentController = async (req:Request, res:Response , next:NextFunction) => { 
    const cancelAppointmentInfoFormat = z.object({
        appointmentId :z.string().regex(/^[0-9a-fA-F]{24}$/),
    })

    const parsedDataWithSuccess = await cancelAppointmentInfoFormat.safeParse(req.body)

    if(parsedDataWithSuccess.success){
        try {
            const appointmentToDelete = await AppointmentModel.findOne({
                appointmentId: new Types.ObjectId(parsedDataWithSuccess.data.appointmentId)
            })

            if (!appointmentToDelete) {
                return res.status(404).json({
                  success: false,
                  message: "Appointment not found"
                });
            }

            // deletign the appointment from the appoinment model
            await AppointmentModel.deleteMany({
                appointmentId: new Types.ObjectId(parsedDataWithSuccess.data.appointmentId)
            })

            // deleting the respective slot from the doctor model
            await DoctorModel.updateMany(
                {doctorId: appointmentToDelete.doctor},
                {$unset: {[`slots_booked.${parsedDataWithSuccess.data.appointmentId}`]:""}}
            )
            res.status(200).json({
                success:true , 
                message: "appointment cancelled successfully"
            })

        } catch (error) {
            res.status(500).json({
                success: false ,
                error
            })
        }
    }
    else{
        res.json({
            success:false ,
            message:"the format was incorrect , try again."
        })
    }
}