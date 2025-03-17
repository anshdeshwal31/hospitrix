import { Request, Response , NextFunction} from 'express';
import { z } from 'zod';
import { UserModel } from '../../models/userModel';

export const EditUserController = async (req:Request, res:Response, next:NextFunction) => {
    const userAccountInfoFormat = z.object({
            userId: z.string().regex(/^[0-9a-fA-F]{24}$/),
            name: z.string().min(5),
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

    if (parsedDataWithSuccess.success) {
        try {
            const {name , image , address , gender  , dateOfBirth , phoneNumber} = parsedDataWithSuccess.data

            await UserModel.updateOne(
                {_id:parsedDataWithSuccess.data.userId},
                {$set:{
                    name, image , address , gender , dateOfBirth: new Date(dateOfBirth) , phoneNumber
                }}
            )

        } catch (error) {
            res.json({
                success: false,
                error
            })      
            
        }
    } else {
        res.status(400).json({
            success: false,
            error:parsedDataWithSuccess.error.errors,
            message: "the format of the info was incorrect, try again with the correct format"
        })
    }
}