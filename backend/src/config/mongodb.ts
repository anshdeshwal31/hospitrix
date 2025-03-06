import mongoose from "mongoose";

export const connectDB = async (Uri:string) => { 
    try {
        await mongoose.connect(`${Uri}prescriptoProject`)
        console.log("connected to DB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
}