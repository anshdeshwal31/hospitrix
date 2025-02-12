import { DoctorModel } from "../../models/doctorModel"
import { Request , Response ,NextFunction } from "express";

export const DoctorsList = async (req:Request, res:Response , next:NextFunction) => {
    try {
        const doctors = await DoctorModel.find({}).select('-password')
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, error })
    }
}