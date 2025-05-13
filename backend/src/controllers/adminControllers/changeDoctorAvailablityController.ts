import {z} from "zod";
import { DoctorModel } from "../../models/doctorModel";
import { Request , Response , NextFunction } from "express";
import { Types } from "mongoose";

const ChangeDoctorAvailablitlyController = async (req:Request  , res:Response , next: NextFunction) => { 
    const parsedDataWithSuccess = z.object({doctorId:z.string().regex(/^[0-9a-fA-F]{24}$/)}).safeParse(req.body);

    if (parsedDataWithSuccess.success) {
        try {
            const doctor = await DoctorModel.findOne({_id:parsedDataWithSuccess.data.doctorId})
            if(doctor){
                await DoctorModel.updateOne(
                    {_id:parsedDataWithSuccess.data.doctorId},
                    {$set:{available:!doctor.available}}
                )
                res.json({
                    success:true , 
                    message: "updated the availablity of the doctor successfully"
                })
            }
        } catch (error) {
            res.json({
                success: false,
                status:500 , 
                error
            })
        }
    } else {
        res.json({
            success: false,
            status: 400 , 
            error: parsedDataWithSuccess.error.errors,
            message:"incorrect format , try again"
        })
    }
}