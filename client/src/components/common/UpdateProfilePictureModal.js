import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { updateProfilePicture } from '../../services/operations/profileApi';
import { useDispatch } from 'react-redux';


const UpdateProfilePictureModal = () => {
    const token = JSON.parse(localStorage.getItem("token"));
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [profilePicture, setProfilePicture] = useState(null);

    const handleChange = (event)=>{
        setProfilePicture(event.target.files[0]);
        console.log(profilePicture);
    }

  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
        
        <div class="px-7 py-5 bg-white flex flex-col justify-center items-center gap-5 text-black rounded-2xl w-80 shadow-lg">
            <h2 class="text-xl mt-4 font-semibold text-center">Update Profile Picture</h2>    
            <input className='rounded-full w-full p-5 border border-pure-greys-400' type='file' name='profilePicture' id='profilePicture' onChange={handleChange} placeholder='Select an image' />     
            <div class="flex flex-col w-full">
            <button onClick={()=>{console.log(profilePicture); updateProfilePicture(profilePicture, token, dispatch, navigate)}} class="px-4 py-2 bg-red-600 m-2 text-white bg-pink-300 rounded-full hover:bg-pink-500 transition-all ">
                Update
            </button>
            <button onClick={()=>{navigate(-1)}} class="px-4 py-2 mr-2 m-2 text-black rounded-full hover:bg-pure-greys-400 transition-all ">
                Cancel
            </button>
            </div>
        </div>
        
    </div>
  )
}

export default UpdateProfilePictureModal