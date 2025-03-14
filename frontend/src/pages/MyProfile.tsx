import  { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { ImageUpload } from '../utils/imageUpload'
import { toast } from 'react-toastify'


const MyProfile = () => {

    const{saveInformation , editUser, userId}  = useContext(UserContext)
    const location = useLocation()
    const {name , email ,password} = location.state

    const {assets} = useContext(AppContext)
    const [imageToUpload , setImageToUpload] = useState<string>("")
    const [isEdit, setIsEdit] = useState(false)
    const [userData, setUserData] = useState({
        name,
        email,
        password,
        image: imageToUpload,
        address: {
            line1: "",
            line2: ""
        },
        gender: 'Male',
        dateOfBirth: new Date().toISOString(),
        phoneNumber: '0000000000',
});

    const handleImageUpload =  async (e:any) => { 
        try {
            const base64 = await ImageUpload(e)
            setImageToUpload(base64 as string )
        } catch (error) {
            toast.error((error as Error).message,{
                className:"bg-red-400 text-white"
            })

        }
        
         
     }

    return userData ? (
        <div className='max-w-lg flex flex-col gap-2 pt-5 ml-44'>

            <img className='w-36 rounded' src={imageToUpload?imageToUpload:assets.upload_area} alt="" />
            
            {isEdit?<input type="file" onChange={handleImageUpload}/>:null}
            {isEdit
                ? <input className='bg-gray-50 text-3xl font-medium max-w-60' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                : <p className='font-medium text-3xl text-[#262626] mt-4'>{userData.name}</p>
            }

            <hr className='bg-[#ADADAD] h-[1px] border-none' />

            <div>
                <p className='text-gray-600 underline mt-3'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]'>
                    <p className='font-medium'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='font-medium'>Phone:</p>

                    {isEdit
                        ? <input className='bg-blue-100 py-1 max-w-52 border rounded-lg' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phoneNumber: e.target.value }))} value={userData.phoneNumber} />
                        : <p className='text-blue-500'>{userData.phoneNumber}</p>
                    }

                    <p className='font-medium'>Address:</p>

                    {isEdit
                        ? <p>
                            <input className='bg-blue-100 pt-1 px-2 border rounded-t-lg' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                            <br />
                            <input className='bg-blue-100 pb-1 px-2 border rounded-b-lg' type="text" onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} /></p>
                        : <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>
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
                        : <p className='text-gray-500'>{userData.gender}</p>
                    }

                    <p className='font-medium'>Birthday:</p>

                    {isEdit
                        ? <input className='w-36 bg-blue-100 px-2 py-1 border rounded-full' type='date' onChange={(e) => { 
                            const date = new Date(e.target.value)
                            setUserData(prev => {
                                return {...prev , dateOfBirth:date.toISOString()}
                        })
                            
                         }} value={userData.dateOfBirth.split('T')[0]} />
                        : <p className='text-gray-500'>{userData.dateOfBirth}</p>
                    }

                </div>
            </div>
            <div className='mt-10'>

                {isEdit
                    ? <button className='  text-white bg-primary-blue border-2 px-8 py-2 rounded-full hover:bg-primary hover:text-white hover:bg-primary-pink transition  duration-500 hover:border-white' onClick={() => userId?editUser({userId,...userData}):saveInformation(userData) }>Save information</button>
                    : <button onClick={() => setIsEdit(true)} className='border-2 text-white bg-primary-blue px-8 py-2 rounded-full hover:bg-primary hover:text-white hover:bg-primary-pink hover:border-white transition duration-500'>Edit</button>
                }

            </div>
        </div>
    ) : null
}

export default MyProfile