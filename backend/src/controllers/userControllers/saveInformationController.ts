import { UserModel } from "../../models/userModel";
import { Request,Response , NextFunction} from "express"
import {z} from "zod";
import bcrypt from "bcrypt"

export const SaveInformationController = async (req:Request, res:Response, next:NextFunction) =>{ 
    const userAccountInfoFormat = z.object({
        fullname: z.string().min(5),
        email: z.string().min(5).email(),
        password: z.string().min(5),
        phoneNumber: z.number().length(10),
        address:{
            line1:z.string().min(5),
            line2:z.string().min(5)
        },
        gender: z.string(),
        dateOfBirth: z.date(),
        
    })

    const parsedDataWithSuccess = await userAccountInfoFormat.safeParse(req.body)

    if(parsedDataWithSuccess){

        try{
            const hashedPassword = bcrypt.hash(req.body.password,5);
            await UserModel.create({
                fullname:req.body.fullname,
                email: req.body.email,
                password: hashedPassword,
                phoneNumber : req.body.phoneNumber,
                address: req.body.address,
                gender: req.body.gender,
                dateOfBirth: req.body.dateOfBirth,
                profilePhoto: req.body.profilePhoto
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
            error: "the format of the info was incorrect, try again with the correct format"
        })
    }

}