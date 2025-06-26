// import {DatesComponent, TimesComponent} from "../components/DatesComponent"
import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { AppContext } from "../context/AppContext"
import { doctorInfoType, DateItemType , timeSlotType} from "../types/Types"
import { v4 as uuidv4 } from 'uuid';
import DoctorCard from "../components/DoctorCard";
import { UserContext } from "../context/UserContext";
import {toast} from 'react-toastify'
import { DNA } from "react-loader-spinner";



let count:number  = 0 ;
const Appointment:React.FC = () => {
      let dateId = uuidv4()
      const [activeTimeId , setActiveTimeID] = useState <string> ()
      const [activeDateId,setActiveDateId] = useState <string> (dateId)
      const [dateTimeArray , setDateTimeArray] = useState<DateItemType[]>([])
      // const [timeSlots, setTimeSlots] = useState <Date[]>([]) // making them a state because we want to use them outside of useEffect but we don't need  them to reinitialize each time the compoent re-renders
      // const [dateSlots, setDateSlots] = useState <string[]>([]) // making them a state because we want to use them outside of useEffect but we don't need  them to reinitialize each time the compoent re-renders
      const [docInfo, setDocInfo] = useState<doctorInfoType | undefined>(undefined) // making them a state because we want to use them outside of useEffect but we don't need  them to reinitialize each time the compoent re-renders

      const {docId} = useParams <{docId:string}>()
      const { assets ,  currencySymbol} = useContext(AppContext)
      const {doctorList, bookAppointment, userId , getDoctorList} = useContext(UserContext)
      count++;
      
      // Add these new state variables to track selected date and time strings
      const [selectedDate, setSelectedDate] = useState<string>("");
      const [selectedTime, setSelectedTime] = useState<string>("");
      const [loading , setLoading] = useState<boolean>(true)

      useEffect(() => { 
  const getDocInfo = async () => { 
    try {
      await getDoctorList(); // Wait for doctor list to be fetched
      const foundDoc = doctorList.find((doctorItem : doctorInfoType) => doctorItem._id === docId )
      setDocInfo(foundDoc);
      
      // Set loading to false if doctor not found or not available
      if (!foundDoc || !foundDoc.available) {
        setDateTimeArray([]);
        setLoading(false);
        return;
      }

      // Generate time slots only if doctor is available
      const today: Date = new Date()
      const tempDateTimeArray:DateItemType[] = [];

      const currentDate:Date = new Date()
      for (let i = 0 ; i<7; i++){
        
        // Create a new date object for each iteration
        const iterationDate = new Date(today);
        iterationDate.setDate(today.getDate() + i);

        const date:number = iterationDate.getDate()
        const day:string = iterationDate.toLocaleString('en-US', { weekday: 'short' })
        
        // Use toISOString and split to get YYYY-MM-DD format
        const fullDateString = iterationDate.toISOString().split('T')[0];

        const time:timeSlotType[] = []
        
        let currentHour:number = iterationDate.getHours()+1

        if(iterationDate.toDateString() === today.toDateString()){
          currentHour<10 ? currentHour = 10: currentHour + 1
        }
        else{
          currentHour =10
        }

        let completeHour:boolean = true 
        while(currentHour<20){
          const timeString = currentHour.toString()+(completeHour?":00":":30");
          
          // Check if this slot is already booked
          const isSlotBooked = Object.values(foundDoc?.slots_booked || {}).some(
            slot => (slot as any).date.split('T')[0] === fullDateString && (slot as any).time === timeString
          );

          // Only add the time slot if it's not already booked
          if (!isSlotBooked) {
            time.push({
              time: timeString,
              id: uuidv4()
            });
          }
          
          completeHour = !completeHour;

          // Check the next half-hour slot
          if (!completeHour) {
            const nextTimeString = currentHour.toString()+(completeHour?":00":":30");
            
            // Check if this slot is already booked
            const isNextSlotBooked = Object.values(foundDoc?.slots_booked || {}).some(
              slot => (slot as any).date.split('T')[0] === fullDateString && (slot as any).time === nextTimeString
            );

            // Only add the time slot if it's not already booked
            if (!isNextSlotBooked) {
              time.push({
                time: nextTimeString,
                id: uuidv4()
              });
            }
            
            completeHour = !completeHour;
          }

          currentHour+=1;
        }

        // Only add dates that have available time slots
        if (time.length > 0) {
          tempDateTimeArray.push({
            date, 
            time,
            day,
            id: dateId
          });
        }
        dateId = uuidv4();
      }

      setDateTimeArray(tempDateTimeArray);
      setLoading(false); // Always set loading to false at the end
      
    } catch (error) {
      console.error("Error fetching doctor info:", error);
      setLoading(false); // Set loading to false even on error
    }
  }

  getDocInfo()
  
}, [docId, doctorList.length]) // Remove docInfo from dependencies, use doctorList.length instead


      console.log(dateTimeArray);
      console.log("count", {count})

      return (
        <div>

      {loading?<div className="flex justify-center items-center pt-16"><DNA/></div>:<div className="w-full flex flex-col items-center"> 


        <div className="flex w-full justify-center md:flex-row flex-col gap-8 mt-3">

          <div className=" pl-4 flex justify-center">
            <img src={docInfo?.image} className = " bg-primary-blue rounded-lg w-[300px] h-[350px] object-cover object-top" alt="" />
          </div>

          <div className="flex flex-col w-[60%] gap-4  "> 
            <div className="w-[70vw] md:w-full border border-slate-400 rounded-lg justify-center  flex flex-col gap-2 px-2 md:pl-6 lg:px-10 py-8 md:ml-0 sm:ml-[100px] ml-[60px]">

              <div className="flex text-4xl gap-3 text-slate-700 font-medium">{docInfo?.name}  <img src={assets.verified_icon} alt="" /></div> 

              <div 
                className="text-lg text-slate-600 flex gap-5">{docInfo?.degree} - {docInfo?.speciality} 
                <button className="border rounded-full border-slate-300 text-sm px-2 ">{docInfo?.experience}</button>
              </div>  

              <div className="flex gap-1 mt-2">About <img src={assets.info_icon} className="w-[13px]" /></div>  

              <div className=" md:w-[95%] lg:w-[95%] text-slate-600">{docInfo?.about}</div>  

              <div className=" flex my-4 text-lg font-medium text-slate-600 gap-2">Appointment fee: <span className="text-black">{currencySymbol}{docInfo?.fees}</span></div>  

            </div>

            <div className="mt-4 text-slate-600 font-medium text-lg md:ml-0 ml-[60px]">Booking slots</div>
            {docInfo && !docInfo.available ? (
              <div className="text-red-500 text-lg">This doctor is currently not available for appointments.</div>
            ) : (
              <>
                <div className="flex gap-5 w-[90vw] sm:w-full lg:m-0 md:-ml-[200px] ml-5 overflow-auto">
                  {
                    dateTimeArray.map((dateTimeItem) => { 
                      return (
                        <div key={dateTimeItem.id} className={`flex flex-col hover:cursor-pointer transition duration-500 gap-1 py-6  px-4 border rounded-full w-[70px] text-xl justify-center items-center ${dateTimeItem.id === activeDateId?"bg-primary-blue text-white border-none":""}`} onClick={() => { 
                          setActiveDateId(dateTimeItem.id);
                          
                          // Format the date as YYYY-MM-DD for backend
                          const currentYear = new Date().getFullYear();
                          const currentMonth = (new Date().getMonth() + 1).toString().padStart(2, '0');
                          const formattedDate = dateTimeItem.date.toString().padStart(2, '0');
                          setSelectedDate(`${currentYear}-${currentMonth}-${formattedDate}`);
                        }}>

                          <div className="w-9">{dateTimeItem.day}</div>
                          <div className="">{dateTimeItem.date}</div>

                        </div>
                      )
                    })
                  }

                </div>

                <div className="w-full">
                  {
                    dateTimeArray.map((dateTimeItem) => { 
                      return (
                        dateTimeItem.id === activeDateId && (
                          <div className="flex lg:m-0 md:-ml-[170px] ml-[50px] gap-5 w-full overflow-auto [&::-webkit-scrollbar]:hidden">
                            {
                              dateTimeItem.time.map((timeItem) => { 
                                return(
                                  <div className={`px-5 py-2 w-[70px] flex justify-center text-slate-500 border rounded-full hover:cursor-pointer  transition duration-500 ${timeItem.id === activeTimeId? "bg-primary-blue text-white border-none ":""}`}onClick={() => { 
                                    setActiveTimeID(timeItem.id);
                                    setSelectedTime(timeItem.time);
                                  }}>
                                    {timeItem.time}
                                  </div>
                                  )
                              })
                            }
                          </div>
                        )
                      )
                    })
                    }
                </div>

                <div>
                  <button 
                    className="text-lg py-3 px-14 bg-primary-blue rounded-full text-white hover:scale-110 transition duration-700 hover:cursor-pointer md:ml-0 ml-12" 
                    onClick={async () => { 
                      if(!selectedDate || !selectedTime) {
                        toast.error("Please select date and time!", {
                          className: "bg-red-400 text-white"
                        });
                        return;
                      }
                      
                      // Call bookAppointment and get result
                      const bookingSuccess = await bookAppointment(selectedDate, selectedTime, userId, docId as string);
                      
                      // If booking was successful, remove the time slot from dateTimeArray
                      if (bookingSuccess) {
                        setDateTimeArray(prevArray => {
                          return prevArray.map(dateItem => {
                            // If this is the active date
                            if (dateItem.id === activeDateId) {
                              // Filter out the booked time slot
                              return {
                                ...dateItem,
                                time: dateItem.time.filter(timeItem => timeItem.time !== selectedTime)
                              };
                            }
                            return dateItem;
                          });
                        });
                        
                        // Reset the selected time and active time ID
                        setSelectedTime("");
                        setActiveTimeID(undefined);
                      }
                    }}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Book Appointment
                  </button>
                </div>
              </>
            )}
          </div>
          
        </div>

        <div className="flex flex-col justify-center items-center w-[75%] gap-6 mt-20"></div>
          <div className="text-center w-full text-4xl font-medium">Related Doctors</div>
          <div className="text-center w-full">Simply browse through our extensive list of trusted doctors.</div>

          <div className="flex flex-wrap gap-6 w-[88%] lg:w-[94%] ml-20 sm:ml-24 lg:ml-28 mt-8">
            {
              doctorList.map((doctorItem:any) => { 
                return (
                  (doctorItem.speciality === docInfo?.speciality && doctorItem._id != docInfo?._id) && (
                    <DoctorCard name={doctorItem.name} key={doctorItem.id} image={doctorItem.image} speciality={doctorItem.speciality} _id = {doctorItem._id}/>
                  )
                )
              })
            }
          </div>
        </div>
}


            </div>
      )

}

export default Appointment