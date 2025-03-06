import {Request , Response,  NextFunction } from "express"
import { z } from "zod";
import { DoctorModel } from "../../models/doctorModel";
import { Types } from "mongoose";
import { error } from "console";

export const ChangeDoctorAvailablity = async (req:Request , res:Response , next:NextFunction) => { 
    const parsedDataWithSuccess = await z.object({
        doctorId: z.string().regex(/^[0-9a-f-A-F$]{24}/),
    }).safeParse(req.body)

    if (parsedDataWithSuccess.success) {
        try {
            const doctor = await DoctorModel.findById(parsedDataWithSuccess.data.doctorId)
            
            if (!doctor) {
                res.status(404).json({
                    success: false,
                    message: "Doctor not found"
                })
                return;
            }
    
            // Toggle the availability
            const result = await DoctorModel.updateOne(
                { _id: new Types.ObjectId(parsedDataWithSuccess.data.doctorId) },
                { $set: { available: !doctor.available } }
            )

            res.status(200).json({
                success: true,
                message: "Doctor availability updated successfully",
                isAvailable: !doctor.available
            })
            return 
        } catch (error) {
            
        }   
    } else {
        res.status(400).json({
            success:false ,
            message: "incorrect format , try again",
            error:parsedDataWithSuccess.error.errors
        })
    }
}