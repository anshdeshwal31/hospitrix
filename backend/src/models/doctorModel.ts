import { executionAsyncId } from "async_hooks";
import mongoose, {Schema} from "mongoose";

const DoctorSchema  = new Schema({
    docId: {type:Number, unique:true , required:true },
    email:{type:String , unique:true , required:true},
    password :{type:String , unique:true , required:true},
    name:{type:String , required:true},
    image:String ,
    speciality: {type:String , required:true },
    degree:{type:Number , required: true},
    experience : {type:Number , required:true} ,
    about : { type:String , required:true} ,
    fees: {type:Number , required:true },
    address:{type:{
        line1: String,
        line2: String
    }, required:true}

})

export const DoctorModel = mongoose.model("Doctor", DoctorSchema);