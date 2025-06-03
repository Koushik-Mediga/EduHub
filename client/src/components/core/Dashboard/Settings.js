import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { getUserDetails, updateProfile } from '../../../services/operations/profileApi';
import Button from '../HomePage/Button';
import { MdDelete } from "react-icons/md";
import { ImPencil2 } from "react-icons/im";


const Settings = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state)=>state.profile.user);
    const token = useSelector((state)=>state.auth.token);
    const [profileImage, setProfileImage] = useState(null);
    const [profileDetails, setProfileDetails] = useState({contactNumber:"", gender:"", dateOfBirth:"", about:""});

    const changeHandler = (event)=>{
      setProfileDetails((prev)=>{
        return (
          {...prev, [event.target.name]:event.target.value}
        )
      })
    }

    const handleFileChange = ()=>{
      setProfileImage(profileImage);
    }

    useEffect(()=>{
        getUserDetails(token, dispatch, navigate);
    }, []);
  return (
  <div className='text-white p-10 flex flex-col gap-10 w-full'>
      <h1 className='text-5xl text-white'>Settings</h1>
      <div className='flex flex-row justify-between border rounded-lg p-10 border-richblack-600'>
          <div className='flex flex-row gap-6'>
              <div className='relative w-28 h-28'>
                  <img
                    src={user.image}
                    alt='User'
                    className='rounded-full w-full h-full object-cover hover:cursor-pointer'
                    onClick={() => window.open(user.image, '_blank')}
                  />
                  <Link
                    to='/dashboard/updateprofilepicture'
                    className='absolute top-0 right-0 p-1 bg-richblack-900 rounded-full text-white hover:scale-95 transition'
                    title='Edit Profile Picture'
                  >
                    <ImPencil2/>
                  </Link>
                </div>
              <div className='flex flex-col justify-center gap-3'>
                  <h3 className='text-3xl '>{user.firstName} {user.lastName}</h3>
                  <p>{user.email}</p>
              </div>
          </div>
          <Button text={'Edit'} active={true} link={'/dashboard/settings'} />
      </div>
      <div className='flex flex-col justify-between items-center border rounded-lg p-10 border-richblack-600 w-full'>
            <h3 className='text-3xl mb-5'>Edit Your Profile Detials</h3>
            <div className='w-full'>
              <p className='text-md text-pure-greys-200'>Contact Number</p>
              <div className='flex flex-row justify-between items-center'>
                <p>{(user.additionalDetails.contactNumber)?(user.additionalDetails.contactNumber):"Not provided"}</p>
                <input className='my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-1/2 bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-800 focus:border-richblack-800 focus:shadow-[0px_1px_1px_rgb(255,255,0)]' type='text' name='contactNumber' id='contactNumber' value={profileDetails.contactNumber} onChange={changeHandler}/>
              </div>
            </div>
            <div className='w-full'>
              <p className='text-md text-pure-greys-200'>Date Of Birth</p>
              <div className='flex flex-row justify-between items-center'>
                <p>{(user.additionalDetails.dateOfBirth)?(user.additionalDetails.dateOfBirth):"Not provided"}</p>
                <input className='my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-1/2 bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-800 focus:border-richblack-800 focus:shadow-[0px_1px_1px_rgb(255,255,0)]' type='date' name='dateOfBirth' id='dateOfBirth' value={profileDetails.dateOfBirth} onChange={changeHandler}/>
              </div>
            </div>
            <div className='w-full'>
              <p className='text-md text-pure-greys-200'>Gender</p>
              <div className='flex flex-row justify-between items-center'>
                <p>{user.additionalDetails.gender ? user.additionalDetails.gender : "Not provided"}</p>
                <select
                  className='my-2 transition-all p-1 focus:outline-none text-white h-[40px] font-inter w-1/2 bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-800 focus:border-richblack-800 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'
                  name='gender'
                  id='gender'
                  value={profileDetails.gender}
                  onChange={changeHandler}
                >
                  <option value=''>Select Gender</option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='others'>Others</option>
                </select>
              </div>
            </div>
            <div className='w-full mb-5'>
              <p className='text-md text-pure-greys-200'>About</p>
              <div className='flex flex-row justify-between items-center'>
                <p className='w-5/12'>{(user.additionalDetails.about)?(user.additionalDetails.about):"Not provided"}</p>
                <input className='my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-1/2 bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-800 focus:border-richblack-800 focus:shadow-[0px_1px_1px_rgb(255,255,0)]' type='text' name='about' id='about' value={profileDetails.about} onChange={changeHandler}/>
              </div>
            </div>
            <button onClick={()=>{updateProfile(profileDetails, token, dispatch, navigate)}} className='rounded-md w-fit h-fit flex justify-center items-center bg-yellow-50 text-black hover:scale-95 transition-all duration-200'><p className='text-md my-3 mx-5'>Edit Profile</p></button>
      </div>
      <div className='flex flex-row justify-between items-center border rounded-lg p-10 border-richblack-600'>
            <h3 className='text-3xl '>Change Your Password Here</h3>
            <Button text={'Change Password'} active={true} link={'/changepassword'} />
      </div>
      <div className='flex flex-row justify-between items-center p-10 border-2 bg-pink-700 border-[#FF0000]'>
            <h3 className='text-3xl'>Delete Account</h3>
            <Link to={'/dashboard/deleteaccount'} ><MdDelete className='text-2xl text-[#FF0000] hover:scale-95 hover:text-pink-500 transition-all' /></Link>
      </div>
  </div>
  )
}

export default Settings