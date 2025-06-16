import React, { useEffect, useState } from 'react';
import SignupImage from '../assets/Images/signup.webp';
import FrameImage from '../assets/Images/frame.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp } from '../services/operations/authApi';
import toast from 'react-hot-toast';

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [signupDetails, setSignupDetails] = useState({email:"", password:"", confirmPassword:"", accountType:"Student", firstName:"", lastName:"", contactNumber:""})
    const token = useSelector((state)=>state.auth.token);

    useEffect(()=>{
        if(token){
            navigate("/dashboard/my-profile");
            return ;
        }
    }, []);

    const changeHandler = (event)=>{
        setSignupDetails((prev)=>{
            return ({...prev, [event.target.name]:event.target.value})
        })
    }

    const submitHandler = (event)=>{
        event.preventDefault();
        sendOtp(signupDetails, navigate);
    }
    
    return (
        <div className='w-screen h-screen flex flex-col items-center'>
            <div className='w-10/12 flex flex-row justify-around items-center mt-10'>
                <form className='w-1/3 flex flex-col justify-start gap-5'>
                    <h1 className='text-3xl text-white font-bold'>Join the Community</h1>
                    <p className='text-md text-richblack-300'>Sign up to access high-quality learning content and expert instructors worldwide.</p>

                    <div className='w-9/12 p-1 rounded-full bg-richblack-700 flex flex-row'>
                        <div
                            className={`w-1/2 text-center py-1 rounded-full transition-all hover:cursor-pointer ${
                                signupDetails.accountType === 'Student' ? 'bg-richblack-900 text-white' : 'text-white/70'
                            }`}
                            onClick={() => setSignupDetails((prev)=>{return ({...prev, accountType:"Student"})})}
                        >
                            Student
                        </div>
                        <div
                            className={`w-1/2 text-center py-1 rounded-full transition-all hover:cursor-pointer ${
                                signupDetails.accountType === 'Instructor' ? 'bg-richblack-900 text-white' : 'text-white/70'
                            }`}
                            onClick={() => setSignupDetails((prev)=>{return ({...prev, accountType:"Instructor"})})}
                        >
                            Instructor
                        </div>
                    </div>

                    <div className='flex gap-3'>
                        <div className='w-1/2'>
                            <p className='text-md text-richblack-100'>First Name <span className='text-pink-400'>*</span></p>
                            <input type='text' required placeholder='John' name='firstName' id='firstName' value={signupDetails.firstName} onChange={changeHandler} className='my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-800 focus:border-richblack-800 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'/>
                        </div>
                        <div className='w-1/2'>
                            <p className='text-md text-richblack-100'>Last Name <span className='text-pink-400'>*</span></p>
                            <input type='text' required placeholder='Doe' name='lastName' id='lastName' value={signupDetails.lastName} onChange={changeHandler}   className='my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-800 focus:border-richblack-800 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'/>
                        </div>
                    </div>

                    {/* Email */}
                    <div>
                        <p className='text-md text-richblack-100'>Email Address <span className='text-pink-400'>*</span></p>
                        <input type='email' required placeholder='john@example.com' name='email' id='email' value={signupDetails.email} onChange={changeHandler} className='my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-800 focus:border-richblack-800 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'/>
                    </div>

                    {/* Contact Number */}
                    <div>
                        <p className='text-md text-richblack-100'>Contact Number <span className='text-pink-400'>*</span></p>
                        <input type='tel' required placeholder='9876543210' name='contactNumber' id='contactNumber' value={signupDetails.contactNumber} onChange={changeHandler} className='my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-800 focus:border-richblack-800 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'/>
                    </div>

                    {/* Password & Confirm Password Side-by-Side */}
                    <div className='flex gap-3'>
                    {/* Password */}
                    <div className='w-1/2'>
                        <p className='text-md text-richblack-100'>
                        Password <span className='text-pink-400'>*</span>
                        </p>
                        <div className='relative'>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder='Create password'
                            name='password' id='password' value={signupDetails.password} onChange={changeHandler}
                            className='my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-800 focus:border-richblack-800 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'
                        />
                        {showPassword ? (
                            <FaRegEyeSlash
                            onClick={() => setShowPassword(false)}
                            className='text-richblack-400 absolute right-3 top-5 hover:cursor-pointer transition-all hover:text-richblack-25'
                            />
                        ) : (
                            <FaRegEye
                            onClick={() => setShowPassword(true)}
                            className='text-richblack-400 absolute right-3 top-5 hover:cursor-pointer transition-all hover:text-richblack-25'
                            />
                        )}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className='w-1/2'>
                        <p className='text-md text-richblack-100'>
                        Confirm Password <span className='text-pink-400'>*</span>
                        </p>
                        <div className='relative'>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            required
                            placeholder='Re-enter password'
                            name='confirmPassword' id='confirmPassword' value={signupDetails.confirmPassword} onChange={changeHandler}
                            className='my-2 p-1 focus:outline-none text-white h-[40px] font-inter w-full bg-richblack-700 rounded-lg border border-richblack-800 focus:bg-richblack-800 focus:border-richblack-800 focus:shadow-[0px_1px_1px_rgb(255,255,0)]'
                        />
                        {showConfirmPassword ? (
                            <FaRegEyeSlash
                            onClick={() => setShowConfirmPassword(false)}
                            className='text-richblack-400 absolute right-3 top-5 hover:cursor-pointer transition-all hover:text-richblack-25'
                            />
                        ) : (
                            <FaRegEye
                            onClick={() => setShowConfirmPassword(true)}
                            className='text-richblack-400 absolute right-3 top-5 hover:cursor-pointer transition-all hover:text-richblack-25'
                            />
                        )}
                        </div>
                    </div>
                    </div>


                    {/* Submit Button */}
                    <button onClick={submitHandler}>
                        <div className='rounded-md w-full h-[40px] flex justify-center items-center bg-yellow-50 text-black hover:scale-95 transition-all duration-200'>
                            <p className='text-md font-bold'>Create Account</p>
                        </div>
                    </button>
                <Link to='/login' className='text-blue-50 hover:text-blue-200 transition-all hover:underline'>Already have an account? Sign in</Link>
                    
                </form>

                {/* Right Side Image */}
                <div className='relative w-[40%]'>
                    <img src={SignupImage} alt='Signup Illustration' className='absolute -top-5 -left-5'/>
                    <img src={FrameImage} alt='Frame Image' />
                </div>
            </div>
        </div>
    );
};

export default Signup;
