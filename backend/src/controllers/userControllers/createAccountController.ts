import {Request , Response , NextFunction } from "express"
import {z} from "zod"
import { UserModel } from "../../models/userModel"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

export const CreateAccountController =  async (req:Request , res:Response , next:NextFunction) => { 
    const parsedDataWithSuccess = z.object({
        name: z.string().min(3),
        email: z.string().min(5).email(),
        password: z.string().min(3),
        image: z.string(),
        address:z.object({
            line1:z.string(),
            line2:z.string()
        }),
        gender: z.string(),
        dateOfBirth: z.string().datetime(),
        phoneNumber: z.string().regex(/^\d{10}$/),
    }).safeParse(req.body)
        
    if (parsedDataWithSuccess.success) {
        console.log("Data parsed successfully")

        try {
            const hashedPassword = await bcrypt.hash(req.body.password,10);
            const userData = await UserModel.create({
                name:req.body.name,
                email: req.body.email,
                password: hashedPassword,
                phoneNumber : req.body.phoneNumber,
                address: req.body.address,
                gender: req.body.gender,
                dateOfBirth: new Date(req.body.dateOfBirth),
                image: req.body.profilePhoto
            })

            dotenv.config();
            const jwtSecret = process.env.JWT_SECRET_KEY || 'fallback-secret'
            const token = await jwt.sign({
                email:req.body.email,
                userId: userData._id
                
            },jwtSecret)
            res.status(200).json({
                success: true,
                message: "Account created successfully",
                userId: userData._id,
                token
            })
        } catch (error) {
            res.json({
                success: false,
                error,
                message: "Account creation failed"
            })
        }
    } else {
            res.status(400).json({  
                success: false,
                error: parsedDataWithSuccess.error.errors,
                message: "Invalid format"
            })
    }
}