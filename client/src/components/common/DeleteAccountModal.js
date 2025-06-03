import React from 'react'
import { useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteAccount } from '../../services/operations/profileApi';

const DeleteAccountModal = () => {
 const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = JSON.parse(localStorage.getItem("token"));
  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
        
        <div class="px-7 py-5 bg-white flex flex-col justify-center items-center gap-5 text-black rounded-2xl w-80 shadow-lg">
            <h2 class="text-xl mt-4 font-semibold text-center">Are you sure you want to Delete your Account?</h2>
            <p className='text-md text-richblack-700 text-center'>Your account will be deleted permanently. Once an account is deleted, it cannot be brought back. </p>
            
            <div class="flex flex-col w-full">
            <button onClick={()=>{deleteAccount(token, dispatch, navigate)}} class="px-4 py-2 bg-red-600 m-2 text-white bg-pink-300 rounded-full hover:bg-pink-500 transition-all ">
                Delete Account
            </button>
            <button onClick={()=>{navigate(-1)}} class="px-4 py-2 mr-2 m-2 text-black rounded-full hover:bg-pure-greys-400 transition-all ">
                Cancel
            </button>
            </div>
        </div>
        
    </div>
  )
}

export default DeleteAccountModal