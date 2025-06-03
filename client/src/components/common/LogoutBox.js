import React from 'react'
import { logout } from '../../services/operations/authApi'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';



const LogoutBox = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
        
        <div class="px-7 py-5 bg-white flex flex-col justify-center items-center gap-5 text-black rounded-2xl w-80 shadow-lg">
            <h2 class="text-xl mt-4 font-semibold text-center">Are you sure you want to log out?</h2>
            
            <div class="flex flex-col w-full">
            <button onClick={()=>{logout(navigate, dispatch)}} class="px-4 py-2 bg-red-600 m-2 text-white bg-pink-300 rounded-full hover:bg-pink-500 transition-all ">
                Log Out
            </button>
            <button onClick={()=>{navigate(-1)}} class="px-4 py-2 mr-2 m-2 text-black rounded-full hover:bg-pure-greys-400 transition-all ">
                Cancel
            </button>
            </div>
        </div>
        
    </div>
  )
}

export default LogoutBox