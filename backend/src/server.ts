import express from "express";
import cors from "cors"; 
import dotenv from 'dotenv'
import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import { userRouter } from "./routes/userRouter.js";
import { adminRouter } from "./routes/adminRouter.js";
import { doctorRouter } from "./routes/doctorRouter.js";

dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.get('/',(req,res) => { 
    res.send("hello")
    res.json({
        success:true,
        message:"backend is working"
    })
 })


app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/doctor", doctorRouter);




app.listen(port , () => { 
    console.log(`port ${port} is listening`)
}) 