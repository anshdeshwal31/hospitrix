import { Request, Response ,NextFunction } from "express";
import { AppointmentModel } from "../../models/appointmentsModel";
import {z} from 'zod'
import { error } from "console";

export const GetAppointmentList = async (req:Request, res:Response , next:NextFunction) => {
    const parsedDataWithSuccess = z.object({userId:z.string().regex(/^[0-9a-fA-F]{24}$/)}).safeParse(req.body)
    if(parsedDataWithSuccess.success){
        try {
            const { userId } = parsedDataWithSuccess.data
            const appointments = await AppointmentModel.find({ userId }).populate("doctorId")

            res.json({ success: true, appointments })

        } catch (error) {
            console.log(error)
            res.json({ success: false, error , message: "found error inside the catch block inside parsedDataWithSuccess.success block" })
        }
    }
    else{
        res.json({
            status:400 , 
            success:false ,
            error: parsedDataWithSuccess.error.errors,
            message: "incorrect format , try again"
        })
    }
}
