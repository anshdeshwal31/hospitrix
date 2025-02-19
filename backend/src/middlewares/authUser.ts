import {Request , Response ,  NextFunction } from "express"
import jwt from "jsonwebtoken"

export const AuthUser = async (req:Request , res:Response, next:NextFunction) =>{ 
    
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message:"No tokens provided"
            })
            return;
        }

        const token = authHeader.split(' ')[1]

        const jwtSecret = process.env.JWT_SECRET || "fallback-secret"
        const decoded  = jwt.verify(token , jwtSecret)

        if (decoded) {
            next()
        } else {
            res.status(403).json({
                success:false ,
                message:"Invalid or expired token"
            })
            return;
        }
    } catch (error) {
        res.status(500).json({
            successs:false ,
            error 
        })
    }
}