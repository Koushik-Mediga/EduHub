import React from 'react'
import { FaArrowRight, FaSpinner } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Button from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks'
import TimelineSection from '../components/core/HomePage/TimelineSection'
import LearningLanguagesSection from '../components/core/HomePage/LearningLanguagesSection'
import Instructor from '../assets/Images/Instructor.png'
import Footer from '../components/common/Footer'
import {ClipLoader} from 'react-spinners';

const Home = () => {
  return (
    <div>
      <div className=' relative w-screen flex flex-col items-center text-white mx-auto justify-between'>
        <Link to={"/signup"}>
          <div className='group mt-10 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit'>
            <div className='flex flex-row justify-between items-center rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900'>
              <p>Become an Instructor </p><FaArrowRight></FaArrowRight>
            </div>
          </div>
        </Link>

        <div className='mt-10 w-6/12 flex flex-col justify-between align-center gap-3'>
          <p className='text-4xl text-white font-bold text-center'>Empower Your Future with <span className='text-4xl text-blue-100 font-bold'>Coding Skills</span></p>
          <p className='text-sm text-richblack-50 text-center '>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedbacks from instructors.</p>
          <div className='flex flex-row justify-center align-center gap-10 mb-5'>
            <Button text="Learn More" active={true} link="/signup"></Button>
            <Button text="Book a Demo" active={false} link="/login"></Button>
          </div>
        </div>
        <div className='mb-[150px] mt-8 w-6/12 shadow-[15px_15px_0px_rgb(255,255,255)] overflow-visible flex justify-center align-center'>
          <video autoPlay loop muted src={Banner} className='shadow-[-3px_-3px_20px_#3399FF]'></video>
        </div>
        <div className='flex flex-col gap-5 items-center w-8/12'>
          <CodeBlocks 
          className='mb-20'
          headingText="Unlock your Coding Potential with our Online Courses"
          paraText="Our courses are designed and taught by Industry Experts who have years of experience and are passionate about sharing their knowledge with you"
          button1Content="Try it yourself"
          linkTo1="/signup"
          button2Content="Learn More"
          linkTo2="/login"
          alignLeft={true}
        ></CodeBlocks>
        <CodeBlocks 
          headingText="Start Coding in seconds"
          paraText="Go ahead, give a try, Our hands-on learning experience means you will be writing real code from the very first day"
          button1Content="Start Tutorial Now"
          linkTo1="/signup"
          button2Content="Learn More"
          linkTo2="/login"
          alignLeft={false}
        ></CodeBlocks>
        </div>
      </div>

      <div className=' bg-pure-greys-5 text-richblack-700 w-screen flex flex-col items-center'>
        <div className='bg-image-2 w-full h-[250px] flex flex-col items-center'>
        <div className='w-11/12 h-full max-w-maxContent flex flex-col items-center justify-center'>
          <div className='flex flex-row items-center gap-3 mt-20'>
            <Button text="Explore all catalogs" active={true} link="/signup"></Button>
            <Button text="Learn More" active={false} link="/signup"></Button>
          </div>
        </div>
        </div>
        <div className='w-11/12 max-w-maxContent flex flex-col items-center mt-24'>
          <div className='flex flex-row justify-center items-center'>
            <div className='w-1/3'>
              <p className='text-4xl text-richblack-800 font-bold '>Get the skills you need for a <span className='text-4xl text-blue-100 font-bold'>Job that's in Demand</span></p>
            </div>
            <div className='flex flex-col w-1/3 gap-5'>
              <p className='text-sm'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth .</p>
              <Button text="Learn More" active={true} link="/signup"></Button>
            </div>
          </div>
          <div>

          </div>
        </div>
        <TimelineSection></TimelineSection>
        <LearningLanguagesSection/>
      </div>

      <div className=' w-full flex flex-col items-center'>
        <div className='flex flex-row w-10/12 justify-center items-center gap-5 mt-16'>
          <img src={Instructor} alt='Instructor image' className='w-1/3 mt-10 mb-5 shadow-[-15px_-15px_0px_rgb(255,255,255)]'></img>
          <div className='flex flex-col gap-5 w-1/3'>
            <p className='text-4xl text-white font-bold'>Become an <span className='text-4xl text-blue-100 font-bold'>Instructor</span></p>
            <p className='text-sm text-richblack-50'>Teachers from around the world teach in EduHub. We provide all the required tools and technology to facilitate you to teach.</p>
            <Button text="Start teaching today" link={"/signup"} active={true}></Button>
          </div>
        </div>
        <Footer/>
      </div>
      
    </div>
  )
}

export default Home
