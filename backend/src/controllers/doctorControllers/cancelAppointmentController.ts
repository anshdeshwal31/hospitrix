import { NextFunction } from "express";
import {z } from "zod";
import { AppointmentModel } from "../../models/appointmentsModel";
import { Types } from "mongoose";

export const CancelAppointmentController = async (req:Request , res: Response , next:NextFunction) => { 
    const parsedDataWithSuccess = await z.object({
        appointmentId: z.string().regex(/^[0-9a-f-A-F$]{24}/),
    }).safeParse(req.body)

    if(parsedDataWithSuccess.success){
        const {appointmentId} = parsedDataWithSuccess.data
        const appointmentToDelete = await AppointmentModel.findOne({_id: new Types.ObjectId(appointmentId)})

        if(!appointmentToDelete)   {
            res.status(404).json({
            success:false , 
            message: "Appointment not found"
        })
        return 
        {}
    
        // return;
        // const doctorId = appointmentToDelete?.doctorId
    }
    else{

    }
}