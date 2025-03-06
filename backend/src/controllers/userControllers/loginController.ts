import { UserModel } from "../../models/userModel"
import bcrypt from "bcrypt"
import {z} from "zod"
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken" 
import dotenv from "dotenv"


export const UserLoginController = async (req:Request, res:Response, next:NextFunction) => { 
    const loginInfoFormat = z.object({
        email:z.string().min(5).email(),
        password:z.string().min(5),
    })

    const parsedDataWithSuccess = await loginInfoFormat.safeParse(req.body)

    if(parsedDataWithSuccess.success){
        try{
            const user = await UserModel.findOne({
                email: req.body.email,
            })
            if(user){
                const { email, password } = parsedDataWithSuccess.data
                const validatedPassword = await bcrypt.compare(password,user.password)

                if(validatedPassword){
                    // send jwt
                    dotenv.config();
                    const jwtSecret = process.env.JWT_SECRET_KEY || 'fallback-secret'
                    const token = await jwt.sign({
                        email,password
                    },jwtSecret)

                    res.json({
                        success:true,
                        message:"logged in succesfully",
                        token,
                        userId:user._id
                    })

                }
                else{
                    res.json({
                        success:false,
                        error: "incorrect password"
                    })
                }
            }  
            else{
                res.json({
                    success:false,
                    error:"user doesn't exist"
                })
            }          
        }catch(error){
            res.json({
                success:false,
                error: "the format of the info was incorrect, try again with the correct format"
            })
        }
    }
    else{
        res.json({
            success: false,
            error: "Invalid login format"
        });
    }

}