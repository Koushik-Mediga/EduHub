import React, { useEffect } from 'react'
import LoginImage from '../assets/Images/login.webp'
import FrameImage from '../assets/Images/frame.png'
import { Link } from 'react-router-dom'
import { FaRegEye } from "react-icons/fa"
import { FaRegEyeSlash } from "react-icons/fa"
import { useState } from 'react'
import { login, resetPasswordToken } from '../services/operations/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const [loginDetails, setLoginDetails] = useState({email:"", password:""});
    const navigate = useNavigate();
    const token = useSelector((state)=>state.auth.token);
    
    useEffect(()=>{
        if (token){
            navigate('/dashboard/my-profile');
            return ;
        }
    }, []);

    const changeHandler = (event)=>{
        setLoginDetails((prev)=>{
            return ({...prev, [event.target.name]:event.target.value})
        })
    }

    const forgotPasswordHandler = async ()=>{
        await resetPasswordToken({ email: loginDetails.email });
    }

    const submitHandler = (event)=>{
        event.preventDefault();
        console.log(loginDetails);
        login(dispatch, loginDetails, navigate);
    }

    function showPasswordClickHandler(){
        setShowPassword(!showPassword);
    }

  return (
    <div className='w-screen h-screen flex flex-col items-center'>
        <div className='w-10/12 flex flex-row justify-around items-center mt-16'>
            <form className='w-1/3 flex flex-col justify-start gap-5' onSubmit={submitHandler}>
                <h1 className='text-3xl text-white font-bold'>Welcome Back</h1>
                <p className='text-md text-richblack-300'>Get ready to explore the world of endless Learning. Are you excited to learn from the best? If yes, then login to learn the latest technologies from the best teachers around the world.</p>
                <div>
                    <p className='text-md text-richblack-100'>Email Address <span className='text-md text-pink-400'>*</span></p>
                    <input type='email' required placeholder='abcd@efgh.ijk' name='email' id='email' value={loginDetails.email} onChange={changeHandler} className='my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-800 focus:border-richblack-800 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'/>
                </div>
                <div>
                    <p className='text-md text-richblack-100'>Password <span className='text-md text-pink-400'>*</span></p>
                    <div className='relative'>
                        <input type={(showPassword)?'text':'password'} required placeholder='password' name='password' id='password' value={loginDetails.password} onChange={changeHandler} className='my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-800 focus:border-richblack-800 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'/>
                        {
                            (showPassword)?<FaRegEyeSlash onClick={showPasswordClickHandler} className='text-richblack-400 absolute right-3 top-5 hover:cursor-pointer transition-all hover:text-richblack-25'/>:<FaRegEye onClick={showPasswordClickHandler} className='text-richblack-400 absolute right-3 top-5 hover:cursor-pointer transition-all hover:text-richblack-25'/>
                        }
                        <div className='flex flex-row-reverse w-full'><Link onClick={forgotPasswordHandler} className='text-blue-50 hover:text-blue-200 transition-all hover:underline'>forgot password</Link></div>
                    </div>
                </div>
                <button>
                    <div className={`rounded-md w-full h-[40px] flex justify-center items-center bg-yellow-50 text-black hover:scale-95 transition-all duration-200`}>
                        <p className='text-md font-bold '>sign in</p>
                    </div>
                </button>
                <Link to='/signup' className='text-blue-50 hover:text-blue-200 transition-all hover:underline'>Do not have an account? Sign up</Link>
            </form>
            <div className='relative w-[40%]'>
                <img src={LoginImage} alt='Login Image' className='absolute -top-5 -left-5 '/>
                <img src={FrameImage} alt='Frame Image' className=''/>
            </div>
        </div>
        

    </div>
  )
}

export default Login