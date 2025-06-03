import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../HomePage/Button';
import { getUserDetails } from '../../../services/operations/profileApi';
import { useNavigate } from 'react-router-dom';


const MyProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=>state.profile.user);
    const token = useSelector((state)=>state.auth.token);
    useEffect(()=>{
        getUserDetails(token, dispatch, navigate);
    }, []);

  return (
    <div className='text-white p-10 flex flex-col gap-10 w-full'>
        <h1 className='text-5xl text-white'>My Profile</h1>
        <div className='flex flex-row justify-between border rounded-lg p-10 border-richblack-600'>
            <div className='flex flex-row gap-6'>
                <img src={user.image} alt='Users image' className='rounded-full h-28 w-28 object-cover hover:cursor-pointer' onClick={()=>{window.open(user.image, "_blank")}}></img>
                <div className='flex flex-col justify-center gap-3'>
                    <h3 className='text-3xl '>{user.firstName} {user.lastName}</h3>
                    <p>{user.email}</p>
                </div>
            </div>
            <Button text={'Edit'} active={true} link={'/dashboard/settings'} />
        </div>
        <div className='flex flex-col gap-4 border rounded-lg p-10 border-richblack-600'>
            <div className='flex flex-row justify-between '>
                <h3 className='text-3xl '>About</h3>
                <Button text={'Edit'} active={true} link={'/dashboard/settings'} />
            </div>
            <p>{user?.additionalDetails?.about}</p>
        </div>
        <div className='flex flex-col gap-4 border rounded-lg p-10 border-richblack-600'>
            <div className='flex flex-row justify-between'>
                <h3 className='text-3xl '>Personal Details</h3>
                <Button text={'Edit'} active={true} link={'/dashboard/settings'} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-richblack-5">
              <div>
                <p className="mb-1 text-richblack-300">First Name</p>
                <p className='text-white text-lg'>{user?.firstName || "Not Provided"}</p>
              </div>
              <div>
                <p className="mb-1 text-richblack-300">Last Name</p>
                <p className='text-white text-lg'>{user?.lastName || "Not Provided"}</p>
              </div>
              <div>
                <p className="mb-1 text-richblack-300">Gender</p>
                <p className='text-white text-lg'>{user?.additionalDetails.gender || "Not Provided"}</p>
              </div>
              <div>
                <p className="mb-1 text-richblack-300">Email</p>
                <p className='text-white text-lg'>{user?.email || "Not Provided"}</p>
              </div>
              <div>
                <p className="mb-1 text-richblack-300">Contact Number</p>
                <p className='text-white text-lg'>{user?.additionalDetails.contactNumber || "Not Provided"}</p>
              </div>
              <div>
                <p className="mb-1 text-richblack-300">Account Type</p>
                <p className='text-white text-lg'>{user?.accountType || "Not Provided"}</p>
              </div>
              <div>
                <p className="mb-1 text-richblack-300">Date of Birth</p>
                <p className='text-white text-lg'>{user?.additionalDetails.dateOfBirth || "Not Provided"}</p>
              </div>
            </div>

        </div>
    </div>
  )
}

export default MyProfile