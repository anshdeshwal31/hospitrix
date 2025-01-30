import mongoose ,{ Schema } from "mongoose";

const AppointmentSchema = new Schema({
    date:{type:Date , required:true},
    time :{type:String , required:true},
    feesPaid: {type:Number , required:true , default:0},
    isCancelled: {type:Boolean , default:false},
    isCompleted: {type:Boolean , default:false},
    isPending: {type:Boolean , default:false},
    doctor: {ref:"doctors"}
})

export const AppointmentModel = mongoose.model("Appointment", AppointmentSchema)