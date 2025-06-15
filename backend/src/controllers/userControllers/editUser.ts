import { Request, Response , NextFunction} from 'express';
import { z } from 'zod';
import { UserModel } from '../../models/userModel';

export const EditUserController = async (req:Request, res:Response, next:NextFunction) => {
    const userAccountInfoFormat = z.object({
            userId: z.string().regex(/^[0-9a-fA-F]{24}$/),
            name: z.string().min(3),
            // password: z.string().min(3),
            image: z.string(),
            address:z.object({
                line1:z.string(),
                line2:z.string()
            }),
            gender: z.string(),
            dateOfBirth: z.string().datetime(),
            phoneNumber: z.string().regex(/^\d{10}$/),
            
    })

    const parsedDataWithSuccess = await userAccountInfoFormat.safeParse(req.body)

    if (parsedDataWithSuccess.success) {
        try {
            const {name , image , address , gender  , dateOfBirth , phoneNumber} = parsedDataWithSuccess.data

            await UserModel.updateOne(
                {_id:parsedDataWithSuccess.data.userId},
                {$set:{
                    name, image , address , gender , dateOfBirth: new Date(dateOfBirth) , phoneNumber
                }}
            )

            const userInfo = await UserModel.findOne({_id:parsedDataWithSuccess.data.userId});
            
            res.status(200).json({
                success: true,
                message: "User profile updated successfully",
                // userInfo    
            })


        } catch (error) {
            res.json({
                success: false,
                error
            })      
            
        }
    } else {
        res.json({
            success: false,
            error:parsedDataWithSuccess.error.errors,
            message: "the format of the info was incorrect, try again with the correct format"
        })
    }
}