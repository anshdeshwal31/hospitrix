import express from "express";
import cors from "cors"; 
import dotenv from 'dotenv'
import { userRouter } from "./routes/userRouter.js";
import { adminRouter } from "./routes/adminRouter.js";
import { doctorRouter } from "./routes/doctorRouter.js";
import { connectDB } from "./config/mongodb.js";
import { connectCloudinary } from "./config/cloudinary.js";

dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000

// middlewares
app.use(express.json({ limit: "5mb" }))
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cors())

// connecting to DB 
try{
    await connectDB(process.env.MONGODB_URI || "")
    await connectCloudinary()
}catch(error){
    console.log("MongoDB connnection error:", error);
    process.exit(1)
}
// api endpoints
app.get('/',(req,res) => { 
    res.status(200).send("hello")
    // res.json({
    //     success:true,
    //     message:"backend is working"
    // })
 })

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.listen(port , () => { 
    console.log(`port ${port} is listening`)
}) 