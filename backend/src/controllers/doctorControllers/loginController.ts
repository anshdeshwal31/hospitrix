import { Response, Request , NextFunction } from "express";
import { DoctorModel } from "../../models/doctorModel";
import { z } from "zod";
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken";

export const DoctorLoginController = async (req:Request , res:Response, next:NextFunction) => {
    const parsedDataWithSuccess = z.object({
        email: z.string().email(), 
        password:z.string().min(5),
     }).safeParse(req.body)

    if(parsedDataWithSuccess.success){
        try {
            const { email, password } = parsedDataWithSuccess.data
            const doctor = await DoctorModel.findOne({ email })
    
            if (!doctor) {
                return res.json({ success: false, message: "Doctor doesn't exist" })
            }
    
            const isMatch = await bcrypt.compare(password, doctor.password)
    
            if (isMatch) {
                const jwtSecret = process.env.JWT_SECRET_KEY || "fallback-secret"
                const token = jwt.sign({email, password} , jwtSecret)
                res.json({ success: true, token , message:"Logged in successfully"})
            } else {
                res.json({ success: false, message: "Incorrect password" })
            }
    
    
        } catch (error) {
            console.log(error)
            res.json({ success: false, error })
        }
    }
    else{
        res.status(400).json({
            success:false ,
            error:parsedDataWithSuccess.error.errors,
            message: "incorrect format , try again"
        })
    }
}
