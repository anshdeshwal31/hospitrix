import {Request,Response, NextFunction } from "express"
import { z } from "zod"
import Razorpay from "razorpay"
import crypto from "crypto"
import { AppointmentModel } from "../../models/appointmentsModel"

const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

export const PayOnlineController = async (req:Request,res:Response,next:NextFunction) => { 
    console.log("Pay Online Controller")

    const parsedDataWithSuccess = z.object({
        appointmentId: z.string().regex(/^[0-9a-fA-F]{24}$/),
        amount:z.number().positive()
    }).safeParse(req.body)

    if(parsedDataWithSuccess.success){
        try {
            const{appointmentId,amount} = parsedDataWithSuccess.data;

            const options = {
                amount:amount*100,
                currency : "INR",
                receipt: `appointment_${appointmentId}`
            }

            const order = await razorpay.orders.create(options)

            res.json({
                success:true,
                orderId:order.id,
                amount:order.amount,
                currency:order.currency,
                key: process.env.RAZORPAY_KEY_ID
            })
        } catch (error) {
            res.json({
                success:false,
                error,
                message:"Failed to create payment order"
            })
        }
    }
    else{
        res.json({
            success:false,
            error:parsedDataWithSuccess?.error.errors,
            message:"Invalid payment data format"
        })
    }
 }

 
export const verifyPayment = async (req:Request,res:Response,next:NextFunction) => {
    const parsedDataWithSuccess = z.object({
        razorpay_order_id: z.string(),
        razorpay_payment_id: z.string(),
        razorpay_signature: z.string(),
        appointmentId: z.string().regex(/^[0-9a-fA-F]{24}$/)
    }).safeParse(req.body);

    if(parsedDataWithSuccess.success){
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature, appointmentId } = parsedDataWithSuccess.data;

            const sign = razorpay_order_id + "|" + razorpay_payment_id;
            const expectedSign = crypto
                .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
                .update(sign.toString())
                .digest("hex");

            if (razorpay_signature==expectedSign) {
                await AppointmentModel.updateOne({_id:appointmentId},
                    {
                        $set:{
                            isPaid:true,
                        }
                    }
                )

                res.json({
                    success:true,
                    message:"payment verified successfully"
                })
            } else {
                res.json({
                    success:false,
                    message:"invalid payment signature"
                })
            }
        } catch (error) {
            res.json({
                success:false,
                error,
                message:"payment verification failed"
            })
        }
    }
    else{
        res.json({
            success:false,
            error:parsedDataWithSuccess.error.errors,
            message:"invalid verification data"
        })

    }
}
