import {Request,Response, NextFunction } from "express"
import { DoctorModel } from "../../models/doctorModel"

export const GetDoctorList = async (req:Request , res:Response , next:NextFunction) => { 
    try{
        const doctorList = await DoctorModel.find().select('-password');

        res.status(200).json({
            success:true ,
            doctorList
        })
    }catch(error){
        console.log(error)
        res.status(400).json({ success: false, error })
    }
}