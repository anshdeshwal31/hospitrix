import { UserModel } from "../../models/userModel"
import { Response , Request , NextFunction } from "express";
import { z } from "zod";

export const GetUserProfile = async (req:Request, res:Response , next : NextFunction) => {

    const parsedDataWithSuccess = z.object({userId:z.string().regex(/^[0-9a-fA-F]{24}$/)}).safeParse(req.body)
    
    if(parsedDataWithSuccess.success){
        try {
            const userInfo = await UserModel.findOne(
                {_id:parsedDataWithSuccess.data.userId}
            )
            res.status(200).json({ success: true, userInfo })

        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, error })
        }
    }
    else{
        res.status(400).json({
            success: false ,
            error:parsedDataWithSuccess.error.errors,
            message: "incorrect format , try again"
        })
    }
}