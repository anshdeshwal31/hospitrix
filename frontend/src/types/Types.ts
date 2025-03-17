// type imageType = typeof 
export interface SpecialityType{
    speciality: string,
    image: string 
}

export interface DoctorCardType{
    _id?: string ,
    name: string ,
    image: string ,
    speciality: string 
}


interface doctorsAddressType{
    line1:string,
    line2:string
}

export interface doctorInfoType{
    _id:string,
    name:string ,
    image:string,
    speciality:string ,
    degree:string,
    experience:string,
    about:string,
    fees:number,
    address:doctorsAddressType
}

export interface timeSlotType{
    time:string,
    id:string ,
}

export interface DateItemType{
    date:number,
    time:timeSlotType[],
    day:string,
    id:string
}

export interface createUserType {
    name:string ,
    email:string ,
    password:string ,
    image:string ,
    address:{
        line1:string ,
        line2:string
    },
    gender:string ,
    dateOfBirth:string ,
    phoneNumber:string
}

export interface editUserType{
    userId:string ,
    name:string ,
    password:string,
    image:string ,
    address:{
        line1:string ,
        line2:string
    },
    gender:string ,
    dateOfBirth:string ,
    phoneNumber:string
}
