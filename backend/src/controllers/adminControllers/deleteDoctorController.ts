import {Request , Response , NextFunction} from "express"
import { parse } from "path";
import { z } from "zod";
import { DoctorModel } from "../../models/doctorModel";

export const DeleteDoctorController = async (req:Request , res:Response , next : NextFunction) => { 
    // const deleteDoctor
    const parsedDataWithSuccess = z.object({doctorId:z.string().regex(/^[0-9a-fA-F]{24}$/)}).safeParse(req.body)

    if (parsedDataWithSuccess.success) {
        try {
            await DoctorModel.deleteOne({
                _id:parsedDataWithSuccess.data?.doctorId
            })

            res.status(200).json({
                success: true  ,
                message: "doctor deleted successfully"
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
            message: "incorrect format , try again"
        })
    }
}