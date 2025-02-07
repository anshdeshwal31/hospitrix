import express from "express";
import cors from "cors"; 
import dotenv from 'dotenv'
import { userRouter } from "./routes/userRouter.js";
import { adminRouter } from "./routes/adminRouter.js";
import { doctorRouter } from "./routes/doctorRouter.js";
import { connectDB } from "./config/mongodb.js";

dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000

// middlewares
app.use(express.json())
app.use(cors())

// connecting to DB 
try{
    await connectDB(process.env.MONGODB_URI || "")
    console.log("connected to DB")
}catch(error){
    console.log("MongoDB connnection error:", error);
    process.exit(1)
}
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