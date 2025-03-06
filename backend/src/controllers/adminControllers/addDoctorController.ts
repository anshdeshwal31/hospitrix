import { Request,Response , NextFunction} from "express"
import {z, ZodError} from "zod"
import { DoctorModel } from "../../models/doctorModel"
import bcrypt from "bcrypt"



export const AddDoctorController = async (req:Request, res:Response , next: NextFunction) => { 
    const hashedPassword = await bcrypt.hash(req.body.password,10)
    const docInfoFormat = z.object({
        email:z.string().email(),
        password:z.string().min(5),
        name: z.string().min(5),
        image: z.string(),
        speciality: z.string(),
        degree: z.string(),
        experience: z.string(),
        about: z.string(),
        available: z.boolean(),
        fees: z.number(),
        address: z.object({
            line1: z.string().min(5),
            line2: z.string().min(5)
        }),
        date: z.string().datetime() , 
    })

    req.body.password = hashedPassword
    const parsedDataWithSuccess = await docInfoFormat.safeParse(req.body)

    if(parsedDataWithSuccess.success){
        try {
            await DoctorModel.create(parsedDataWithSuccess.data)
            res.json({
                success: true , 
                message: "doctor added successfully"
            })
        } catch (error) {
            res.json({
                success:false,
                error,
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