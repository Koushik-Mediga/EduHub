import React from 'react'
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import compareWithOthers from '../../../assets/Images/Compare_with_others.png'
import planYourLessons from '../../../assets/Images/Plan_your_lessons.png'
import Button from './Button'

const LearningLanguagesSection = () => {
  return (
    <div className='w-11/12 flex flex-col items-center mt-28 gap-3 pb-9'>
        <p className='text-3xl text-richblack-800 font-bold text-center w-7/12'>Your Swiss knife for learning <span className='text-3xl text-blue-100 font-bold'>any Language</span></p>
        <p className='text-md text-richblack-500 text-center w-6/12'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedbacks from instructors.</p>
        <div className='w-10/12 flex flex-row items-center justify-center'>
            <img src={knowYourProgress} alt='Know your progress image' className=' -mr-32'/>
            <img src={compareWithOthers} alt='Compare with others image' className='-mr-28'/>
            <img src={planYourLessons} alt='Plan your lessons image' className='-ml-10'/>
        </div>
        <Button text="Join Now" link="/signup" active={true} className='mb-10' />
    </div>
  )
}

export default LearningLanguagesSection