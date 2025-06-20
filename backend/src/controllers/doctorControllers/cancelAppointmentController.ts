import { NextFunction, Request , Response } from "express";
import {z } from "zod";
import { AppointmentModel } from "../../models/appointmentsModel";
import { Types } from "mongoose";
import { DoctorModel } from "../../models/doctorModel";

export const CancelAppointmentController = async (req:Request , res: Response , next:NextFunction) => { 
    const parsedDataWithSuccess = await z.object({
        appointmentId: z.string().regex(/^[0-9a-f-A-F$]{24}/),
    }).safeParse(req.body)

    if(parsedDataWithSuccess.success){
        try{
            const {appointmentId} = parsedDataWithSuccess.data
            const appointmentToDelete = await AppointmentModel.findOne({_id: new Types.ObjectId(appointmentId)})

            if(!appointmentToDelete)   {
                res.status(404).json({
                    success:false , 
                    message: "Appointment not found"
                })
                return;
            }
            
            if(appointmentToDelete.isCompleted || appointmentToDelete.isCancelled){
                res.status(400).json({
                    success:false , 
                    message: "Appointment is already completed or cancelled, can't cancel it now ."
                })
                return;
            }

            await AppointmentModel.updateOne({
                _id: new Types.ObjectId(parsedDataWithSuccess.data.appointmentId)
            },{
                $set:{isCancelled:true, isPending:false}
            })

            const doctorId = appointmentToDelete.doctorId
            await DoctorModel.updateOne(
                {_id: doctorId},
                {$unset:{[`slots_booked.${appointmentId}`]:""}}
            )
            res.status(200).json({
                success: true ,
                message: "Appointment cancelled successfully"
            })
        }catch(error){
            res.status(500).json({
                success: false ,
                error
            })
        }
    }
    else{
        res.json({
            status: 400,
            success:false ,
            message: "incorrect format , try again"
        })
    }

}