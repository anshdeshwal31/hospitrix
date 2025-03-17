import {Request , Response , NextFunction } from "express"
import {z} from "zod"
import { UserModel } from "../../models/userModel"
import bcrypt from "bcrypt"

export const CreateAccountController =  async (req:Request , res:Response , next:NextFunction) => { 
    const parsedDataWithSuccess = z.object({
        name: z.string().min(5),
        email: z.string().min(5).email(),
        password: z.string().min(5),
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
            res.status(200).json({
                success: true,
                message: "Account created successfully",
                userId: userData._id
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