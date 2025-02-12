import { UserModel } from "../../models/userModel"
import { Response , Request , NextFunction } from "express";
import { z } from "zod";

export const GetProfile = async (req:Request, res:Response , next : NextFunction) => {

    const parsedDataWithSuccess = z.object({userId:z.string().regex(/^[0-9a-fA-F]{24}$/)}).safeParse(req.body)
    
    if(parsedDataWithSuccess.success){
        try {
            const userData = await UserModel.findOneAndUpdate(
                {_id:parsedDataWithSuccess.data.userId}
            )
            res.json({ success: true, userData })

        } catch (error) {
            console.log(error)
            res.json({ success: false, error })
        }
    }
    else{
        res.status(400).json({
            success: false ,
            message: "incorrect format , try again"
        })
    }
}