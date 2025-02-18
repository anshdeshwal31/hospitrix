import { Response, Request , NextFunction } from "express";
import { DoctorModel } from "../../models/doctorModel";
import { z } from "zod";
import bcrypt from "bcrypt"
import  jwt from "jsonwebtoken";

export const LoginDoctor = async (req:Request , res:Response, next:NextFunction) => {
    const parsedDataWithSuccess = z.object({
        email: z.string().email(), 
        password:z.string().min(5),
        doctorId: z.string().regex(/^[a-fA-F0-9]{24}$/)
     }).safeParse(req.body)

    if(parsedDataWithSuccess.success){
        try {
            const {doctorId , email, password } = parsedDataWithSuccess.data
            const doctor = await DoctorModel.findOne({ email })
    
            if (!doctor) {
                return res.json({ success: false, message: "Invalid credentials" })
            }
    
            const isMatch = await bcrypt.compare(password, doctor.password)
    
            if (isMatch) {
                const jwtSecret = process.env.JWT_SECRET || "fallback-secret"
                const token = jwt.sign(doctorId , jwtSecret)
                res.json({ success: true, token })
            } else {
                res.json({ success: false, message: "Invalid credentials" })
            }
    
    
        } catch (error) {
            console.log(error)
            res.json({ success: false, error })
        }
    }
    else{
        res.status(400).json({
            success:false ,
            message: "incorrect format , try again"
        })
    }
}
