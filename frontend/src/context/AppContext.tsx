import { createContext, ReactNode} from "react";
import { doctors, assets, specialityData } from "../assets/frontend/assets";
import { doctorInfoType, SpecialityType } from "../types/Types";

interface AppContextType{
    doctors:doctorInfoType[],
    currencySymbol: string ,
    assets:Record<string , string >,
    specialityData: SpecialityType[]
}
export const AppContext = createContext<AppContextType  >(  
    {doctors: [],
    currencySymbol: "₹",
    assets,
    specialityData,
});


export const AppContextProvider:React.FC<{children: ReactNode}> = ({ children })  => {
    const currencySymbol:string = "₹";
    const value = {
        doctors,
        currencySymbol,
        assets, 
        specialityData
    }

    return (
            <AppContext.Provider value={value}>
                {children}
            </AppContext.Provider>
            )
}