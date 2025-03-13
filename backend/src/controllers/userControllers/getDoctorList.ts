import {Request , Response , NextFunction } from "express";
import { DoctorModel } from "../../models/doctorModel";

export const GetDoctorList = async(req:Request , res:Response , next:NextFunction) => {

    try {
        const doctors = await DoctorModel.find().select("-password")
        res.status(200).json({
            success:true,
            doctors
        })
    } catch (error) {
        console.log(error)
        res.json({
            success:false ,
            error
        })
        
    }   
}
