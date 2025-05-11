import { Request , Response , NextFunction } from "express";
import { z } from "zod";
import { DoctorModel } from "../../models/doctorModel";

export const EditDoctorController = async (req:Request , res:Response , next : NextFunction) => { 
    const docInfoFormat = z.object({
        doctorId: z.string().regex(/^[0-9a-fA-F]{24}$/),
        email:z.string().email(),
        password:z.string().min(3),
        name: z.string().min(3),
        image: z.string(),
        speciality: z.string(),
        degree: z.string(),
        experience: z.string(),
        about: z.string(),
        available: z.boolean(),
        fees: z.number(),
        address: z.object({
            line1: z.string(),
            line2: z.string()
        }),
        date: z.string().datetime() 
    })

    const parsedDataWithSuccess = docInfoFormat.safeParse(req.body)

    if (parsedDataWithSuccess.success) {
        try {
            await DoctorModel.updateOne(
                {_id:parsedDataWithSuccess.data.doctorId}, 
                {$set:parsedDataWithSuccess.data})

            res.status(200).json({
                success: true  ,
                message: "doctor info updated successfully"
            })
        } catch (error) {
            res.status(500).json({
                successs:false ,
                error 
            })
        }
    } else {
        res.status(400).json({
            success: false ,
            message: "incorrect format , try again",
            error:parsedDataWithSuccess.error.errors
        })
    }
}