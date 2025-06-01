import mongoose ,{ Schema } from "mongoose";

const objectId = Schema.ObjectId
const AppointmentSchema = new Schema({
    date:{type:Date , required:true},
    time :{type:String , required:true},
    isPaid: {type:Boolean , required:true , default:false},
    isCancelled: {type:Boolean , default:false},
    isCompleted: {type:Boolean , default:false},
    isPending: {type:Boolean , default:true},
    doctorId: {type:objectId ,ref:"Doctor"},
    userId: {type:objectId , ref:"User"}
})

export const AppointmentModel = mongoose.model("Appointment", AppointmentSchema)