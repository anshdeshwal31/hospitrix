import {Request , Response, NextFunction } from "express";
import { z } from "zod";
import { DoctorModel } from "../../models/doctorModel";
import { doctorRouter } from "../../routes/doctorRouter";

export const EditDoctorController = async (req: Request , res:Response , next:NextFunction) => { 
    const docInfoFormat = z.object({
        doctorId: z.string().regex(/^[0-9a-fA-F]{24}$/),
        image: z.string(),
        about: z.string(),
        available: z.boolean(),
        address: z.object({
            line1: z.string(),
            line2: z.string()
        }),
        fees:z.number()
    }
    )

    const parsedDataWithSuccess =  docInfoFormat.safeParse(req.body)

    if (parsedDataWithSuccess.success) {
        try {
            await DoctorModel.updateOne({_id:parsedDataWithSuccess.data.doctorId} , {$set:{
                _id:parsedDataWithSuccess.data.doctorId,
                image:parsedDataWithSuccess.data.image,
                about:parsedDataWithSuccess.data.about,
                available: parsedDataWithSuccess.data.available,
                address:{
                    line1: parsedDataWithSuccess.data.address.line1,
                    line2: parsedDataWithSuccess.data.address.line2,
                },
                fees:parsedDataWithSuccess.data.fees
            }})

            const doctorInfo = await DoctorModel.findOne({_id:parsedDataWithSuccess.data.doctorId})
            res.status(200).json({
                success: true  ,
                message: "doctor info updated successfully",
                updatedDoctorData:doctorInfo
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
