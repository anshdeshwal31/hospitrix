import { Request,Response , NextFunction} from "express"
import {z} from "zod"



export const AddDoctorController = async (req:Request, res:Response , next: NextFunction) => { 
    const docInfoFormat = z.object({
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
        date: z.number() , 
        slots_booked: z.object({})
    })
}