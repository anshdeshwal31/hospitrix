import { UserModel } from "../../models/userModel";
import { Request,Response , NextFunction} from "express"
import {z} from "zod";
import bcrypt from "bcrypt"

export const SaveInformationController = async (req:Request, res:Response, next:NextFunction) =>{ 
    const userAccountInfoFormat = z.object({
        name: z.string().min(5),
        email: z.string().min(5).email(),
        password: z.string().min(5),
        image: z.string(),
        address:z.object({
            line1:z.string().min(5),
            line2:z.string().min(5)
        }),
        gender: z.string(),
        dateOfBirth: z.string().datetime(),
        phoneNumber: z.string().regex(/^\d{10}$/),
        
    })

    const parsedDataWithSuccess = await userAccountInfoFormat.safeParse(req.body)
    console.log("khabib")
    if(parsedDataWithSuccess.success){
        
        try{
            console.log("khabib")
            console.log(req.body.name)

            const hashedPassword = await bcrypt.hash(req.body.password,10);
            await UserModel.create({
                name:req.body.name,
                email: req.body.email,
                password: hashedPassword,
                phoneNumber : req.body.phoneNumber,
                address: req.body.address,
                gender: req.body.gender,
                dateOfBirth: new Date(req.body.dateOfBirth),
                image: req.body.profilePhoto
            })

            res.json({
                success: true ,
                message: "account created successfully"
            })
        }catch(error){
            res.json({
                success:false,
                error
            })
        }
    }
    else{
        res.json({
            success:false,
            error:parsedDataWithSuccess.error.errors,
            message: "the format of the info was incorrect, try again with the correct format"
        })
    }

}