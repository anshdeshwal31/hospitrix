import mongoose, {Schema} from "mongoose";

const DoctorSchema  = new Schema({
    email:{type:String , unique:true , required:true},
    password :{type:String , required:true},
    name:{type:String , required:true},
    image:{type:String , required:true},
    speciality: {type:String , required:true },
    degree:{type:String , required: true},
    experience : {type:String , required:true} ,
    about : { type:String , required:true} ,
    available: {type:Boolean, required:true},
    fees: {type:Number , required:true },
    address: {type:Object , required:true},
    dateAdded: {type:Date , required: true},
    slots_booked : {type:Object , default: {}}
},{minimize:false})

export const DoctorModel = mongoose.models.Doctor || mongoose.model("Doctor", DoctorSchema);
