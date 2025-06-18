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
// app.use(cors({
//     origin: process.env.FRONTEND_URL || "http://localhost:3000",
//     credentials: true
// })); // Correct usage: pass options to cors(), not app.use()
app.use(cors())

// connecting to DB 
// (async () => {
    try{
        await connectDB(process.env.MONGODB_URI || "")
        await connectCloudinary()
        
        app.use("/api/user", userRouter);
        app.use("/api/admin", adminRouter);
        app.use("/api/doctor", doctorRouter);

        app.listen(port , () => { 
            console.log(`port ${port} is listening`)
        })
    }catch(error){
        console.log("MongoDB connection error:", error);
        process.exit(1)
    }
// })();