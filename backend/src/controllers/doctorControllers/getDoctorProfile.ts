import {Request , Response , NextFunction } from "express"
import {z} from "zod"
import { DoctorModel } from "../../models/doctorModel"


export const GetDoctorProfile =async (req:Request, res: Response , next:NextFunction) => { 
    const parsedDataWithSuccess = z.object({doctorId:z.string().regex(/^[0-9a-fA-F]{24}$/)}).safeParse(req.body)

    if (parsedDataWithSuccess.success) {
        try {
            const doctorInfo = await DoctorModel.findOne({
                _id:parsedDataWithSuccess.data.doctorId
            })

            res.status(200).json({
                 success: true,
                  doctorInfo 
            })
            return;

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, error })
            return ;
        }
    } else {
        res.status(400).json({
            success: false ,
            message: "incorrect format , try again"
        })
        return;
    }
    
}