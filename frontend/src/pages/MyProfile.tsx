import  { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { UserContext } from '../context/UserContext'
import { ImageUpload } from '../utils/imageUpload'
import { toast } from 'react-toastify'


const MyProfile = () => {

    const{ editUser, userId  ,userProfile , name , email , password }  = useContext(UserContext)
    const {assets} = useContext(AppContext)
    const [imageToUpload , setImageToUpload] = useState<string>("")
    const [isEdit, setIsEdit] = useState(false)
    
    const [userData, setUserData] = useState({
        name:userProfile.name?userProfile.name:name,
        // password,
        image: imageToUpload?imageToUpload:"",
        address: {
            // line1: "",
            // line2:""
            line1: userProfile.address?.line1?userProfile.address.line1:"",
            line2: userProfile.address?.line2?userProfile.address.line2:""
        },
        gender: 'Male',
        dateOfBirth: new Date().toISOString(),
        phoneNumber: userProfile.phoneNumber?userProfile.phoneNumber:'0000000000',
    });

    // const handleUserProfile = () => { 
    //     if (userId) {
    //         editUser({...userData , userId})
    //     } else {
    //         saveInformation({...userData , email})
    //     }
    //  }

    useEffect(() => {
        console.log("user profile data fromm the backend: ",userProfile)
        console.log("user data in the state: ", userData)
        if (imageToUpload) {
            setUserData({...userData, image: imageToUpload})
            // setUserData(prev => ({...prev, image: imageToUpload}))
        }

    }, [imageToUpload])

    useEffect(() => {
        if (userProfile && Object.keys(userProfile).length > 0) {
            setUserData(prev => ({
                ...prev,
                name: userProfile.name || name,
                address: {
                    line1: userProfile.address?.line1 || "",
                    line2: userProfile.address?.line2 || ""
                },
                phoneNumber: userProfile.phoneNumber || '0000000000',
                gender: userProfile.gender || 'Male',
                dateOfBirth: userProfile.dateOfBirth || new Date().toISOString()
            }))
        }
        console.log("user profile from backend",userProfile)
    }, [userProfile])
    // useEffect(() => { 
    //     if(uToken){
    //         getUserProfile()
    //     }
    //  },[])
    

    const saveUserInfo = async () => { 
        // console.log("name of the user: " , name )
        // console.log("image the user uploaded: ", imageToUpload)

        await editUser({userId,...userData})
        console.log({userId,...userData});
        setIsEdit(false)
     } 

    const handleImageUpload =  async (e:React.ChangeEvent<HTMLInputElement>) => { 
        try {
            const base64 = await ImageUpload(e)

            // console.log("inside handle image function")
            // console.log("image: " , base64)

            setImageToUpload(base64 as string )
            console.log("user data: ", userData)

            // console.log("image state:" ,imageToUpload )
            // console.log("image uploaded succesfully")
            
            toast.success("image uploaded successfully", {
                className:"bg-green-400 text-white"
            })
        } catch (error) {
            console.log("getting error while uploading the image")
            toast.error((error as Error).message,{
                className:"bg-red-400 text-white"
            })

        }  
     }

    return userData ? (
        <div className='max-w-lg flex flex-col gap-2 pt-5 sm:ml-28 ml-16 md:ml-44'>

            <img className='w-36 h-[170px] object-cover object-top rounded-lg' src={imageToUpload?imageToUpload:userProfile.image?userProfile.image:assets.upload_area} alt="" />
            
            {isEdit?<input type="file" onChange={handleImageUpload}/>:null}
            {isEdit
                ? <input className='bg-blue-100 text-3xl font-medium max-w-60' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData?.name}/>
                : <p className='font-medium text-3xl text-[#262626] mt-4'>{userProfile.name}</p>
            }

            <hr className='bg-[#ADADAD] h-[1px] w-[250px] sm:w-[300px] md:w-[350px]  lg:w-[400px] border-none' />

            <div>
                <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userProfile.email?userProfile.email:email}</p>
                    <p className='font-medium'>Phone:</p>

                    {isEdit
                        ? <input className='bg-blue-100 py-1 max-w-52 border rounded-lg' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phoneNumber: e.target.value }))} value={userData.phoneNumber} />
                        : <p className='text-blue-500'>{userProfile?.phoneNumber || "0000000000"}</p>
                    }

                    <p className='font-medium'>Address:</p>

                    {isEdit
                        ? <p>
                            <input className='bg-blue-100 pt-1 px-2 border rounded-t-lg' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address?.line1||""} />
                            <br />
                            <input className='bg-blue-100 pb-1 px-2 border rounded-b-lg' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address?.line2 || ""} /></p>
                        : <p className='text-gray-500'>{userProfile.address?.line1 || ""} <br /> {userProfile.address?.line2 || ""}</p>
                    }

                </div>
            </div>
            <div>
                <p className='text-[#797979] underline mt-3'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600'>
                    <p className='font-medium'>Gender:</p>

                    {isEdit
                        ? <select className='w-28 px-2 py-2 rounded-full bg-blue-100' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p className='text-gray-500'>{userProfile.gender}</p>
                    }

                    <p className='font-medium'>Birthday:</p>

                    {isEdit
                        ? <input className='w-36 bg-blue-100 px-2 py-1 border rounded-full' type='date' onChange={(e) => { 
                            const date = new Date(e.target.value)
                            setUserData(prev => {
                                return {...prev , dateOfBirth:date.toISOString()}
                        })
                            
                         }} value={userData.dateOfBirth.split('T')[0]} />
                        : <p className='text-gray-500'>{userData.dateOfBirth.split('T')[0]}</p>
                    }

                </div>
            </div>
            <div className='mt-10'>

                {isEdit
                    ? <button className='  text-white bg-primary-blue border-2 px-8 py-2 rounded-full hover:bg-primary hover:text-white hover:bg-primary-pink transition  duration-500 hover:border-white' onClick={ saveUserInfo }>Save information</button>
                    : <button onClick={() => setIsEdit(true)}  className='border-2 text-white bg-primary-blue px-8 py-2 rounded-full hover:bg-primary hover:text-white hover:bg-primary-pink hover:border-white transition duration-500'>Edit</button>
                }

            </div>
        </div>
    ) : null
}

export default MyProfile