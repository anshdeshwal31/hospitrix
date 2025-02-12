import { Request,Response , NextFunction} from "express"
import {z} from "zod"
import { DoctorModel } from "../../models/doctorModel"



export const AddDoctorController = async (req:Request, res:Response , next: NextFunction) => { 
    const docInfoFormat = z.object({
        doctorId: z.string().regex(/^[0-9a-fA-F]{24}$/),
        email:z.string().email(),
        password:z.string().min(5),
        name: z.string().min(5),
        image: z.string(),
        specialiaty: z.string(),
        degree: z.string(),
        experience: z.string(),
        about: z.string(),
        available: z.boolean(),
        fees: z.number(),
        address: z.object({
            line1: z.string().length(5),
            line2: z.string().length(5)
        }),
        date: z.string().datetime() , 
        slots_booked: z.object({})
    })

    const parsedDataWithSuccess = await docInfoFormat.safeParse(req.body)

    if(parsedDataWithSuccess.success){
        try {
            DoctorModel.create(parsedDataWithSuccess.data)
            res.json({
                success: true , 
                message: "doctor added successfully"
            })
        } catch (error) {
            res.json({
                success:false,
                error
            })
        }
    }
    else{
        res.json({
            success:false,
            error: "the format of the info was incorrect, try again with the correct format"
        })
    }
}