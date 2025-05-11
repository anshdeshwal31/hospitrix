import { AppointmentModel } from "../../models/appointmentsModel"
import {z} from "zod"
import { Types } from "mongoose"
import {Request, Response, NextFunction} from "express"
import { DoctorModel } from "../../models/doctorModel"


export const BookAppointmentController = async (req:Request, res:Response, next:NextFunction) => { 
    const appointmentInfoFormat = z.object({
        date:z.string(),
        // date:z.string().datetime(),
        time : z.string(),
        userId: z.string().regex(/^[0-9a-fA-F]{24}$/),
        doctorId:z.string().regex(/^[0-9a-fA-F]{24}$/),
    })

    const parsedDataWithSuccess  = await appointmentInfoFormat.safeParse(req.body)

    if(parsedDataWithSuccess.success){
        try {
            const createdAppointment = await AppointmentModel.create({
                date:new Date(req.body.date),
                time : req.body.time,
                userId: new Types.ObjectId(parsedDataWithSuccess.data.userId),
                doctorId: new Types.ObjectId(parsedDataWithSuccess.data.doctorId)
            })

            await DoctorModel.updateOne(
                {_id: parsedDataWithSuccess.data.doctorId},
                {$set:{[`slots_booked.${createdAppointment._id}`]: {time:parsedDataWithSuccess.data.time , date: parsedDataWithSuccess.data.date}}}
            )
            res.json({
                success: true,
                message: "appointment booked succesfully"
            })
        } catch (error) {
            res.json({
                success:false,
                error
            })
        }
    }
    else{
        res.json({
            success:false,
            message: "incorrect format , try again",
            error:parsedDataWithSuccess.error.errors
        })
    }
}