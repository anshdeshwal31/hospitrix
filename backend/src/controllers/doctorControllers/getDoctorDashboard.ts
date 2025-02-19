import { Request , Response , NextFunction } from "express"
import { z } from "zod";
import { AppointmentModel } from "../../models/appointmentsModel";

export const GetDoctorDashboard = async (req:Request , res:Response , next:NextFunction) => { 
    const parsedDataWithSuccess = await z.object({
        doctorId: z.string().regex(/^[0-9a-f-A-F$]{24}/),
    }).safeParse(req.body)

    if (parsedDataWithSuccess.success) {
        try {
            const appointmentInfo = await AppointmentModel.find(
                {doctorId:parsedDataWithSuccess.data.doctorId}
            )

            let earnings:number = 0
            appointmentInfo.forEach((value) => { 
               if(value.isCompleted) earnings+=value.feesPaid;
            })

            let patients:string[] = []

            appointmentInfo.forEach((value) => {
                if (value) {
                    const userIdStr = value.userId ? value.userId.toString() : ""; 
                    if (userIdStr.length>0 && !patients.includes(userIdStr)) {
                        patients.push(userIdStr);
                    }
                }     
            })

            const dashboardData = {
                earnings,
                appointmentInfo: appointmentInfo.length,
                patients: patients.length,
                latestAppointments: appointmentInfo.reverse()
            }
            
            res.status(200).json({
                success:true ,
                dashboardData
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