import mongoose ,{ Schema } from "mongoose";

const objectId = Schema.ObjectId
const AppointmentSchema = new Schema({
    date:{type:Date , required:true},
    time :{type:String , required:true},
    feesPaid: {type:Number , required:true , default:0},
    isCancelled: {type:Boolean , default:false},
    isCompleted: {type:Boolean , default:false},
    isPending: {type:Boolean , default:true},
    doctorId: {type:objectId ,ref:"doctors"},
    userId: {type:objectId , ref:"users"}
})

export const AppointmentModel = mongoose.model("Appointment", AppointmentSchema)