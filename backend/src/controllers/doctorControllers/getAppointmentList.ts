import { Request, Response ,NextFunction } from "express";
import { AppointmentModel } from "../../models/appointmentsModel";
import {z} from 'zod'

export const GetAppointmentList  = async (req:Request , res:Response , next:NextFunction) => { 
    const parsedDataWithSuccess = z.object({doctorId:z.string().regex(/^[0-9a-fA-F]{24}$/)}).safeParse(req.body)
    if(parsedDataWithSuccess.success){
        try {
            const { doctorId } = parsedDataWithSuccess.data
            const appointments = await AppointmentModel.find({ doctorId }).populate("userId")
    
            res.status(200).json({ success: true, appointments })
            return;
    
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, error })
        }
    }
    else{
        res.status(400).json({
            success:false ,
            message: "incorrect format , try again"
        })
    }

}