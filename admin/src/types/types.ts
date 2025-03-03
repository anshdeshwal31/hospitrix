export interface appointmentType{
    _id:string,
    date: Date ,
    time:string,
    feesPaid:number,
    isCancelled: boolean,
    isCompleted: boolean,
    isPending: boolean,
    doctorId:string,
    userId:string
}

interface slotType{
    time: string ,
    date: string 
}

interface addressType {
    address1: string ,
    address2: string 
}

export interface doctorProfileType{
    _id:string , 
    email:string,
    password: string ,
    name :string ,
    image: string ,
    speciality : string ,
    degree:string ,
    experience : string, 
    about : string,
    available : boolean,
    fees: number,
    address: Record<string,addressType>,
    date:string
    slots_booked: Record<string, slotType>
}

export interface DoctorProfileWithoutId extends Omit<doctorProfileType,"_id">{}

export interface doctorDashboardDataType{
    earnings: number,
    appointmentInfo:number,
    patients: number,
    latestAppointments: appointmentType[]    
}

export interface adminDashboardDataType{
    doctors:number,
    appointments: number,
    patients:number,
    latestAppointments:appointmentType[]
}