import {Request , Response,  NextFunction } from "express"
import { z } from "zod";
import { DoctorModel } from "../../models/doctorModel";
import { Types } from "mongoose";

export const ChangeDoctorAvailablity = async (req:Request , res:Response , next:NextFunction) => { 
    const parsedDataWithSuccess = await z.object({
        doctorId: z.string().regex(/^[0-9a-f-A-F$]{24}/),
    }).safeParse(req.body)

    if (parsedDataWithSuccess.success) {
        try {
            const doctor = await DoctorModel.findById(parsedDataWithSuccess.data.doctorId)
            
            if (!doctor) {
                return res.status(404).json({
                    success: false,
                    message: "Doctor not found"
                })
            }
    
            // Toggle the availability
            const result = await DoctorModel.updateOne(
                { _id: new Types.ObjectId(parsedDataWithSuccess.data.doctorId) },
                { $set: { available: !doctor.available } }
            )
        } catch (error) {
            
        }   
    } else {
        res.status(400).json({
            success:false ,
            message: "incorrect format , try again"
        })
    }
}