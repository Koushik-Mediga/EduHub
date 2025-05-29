import React from 'react'
import logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const timelineData = [
    {
        logo: logo1,
        heading: "Leadership",
        subHeading:"Fully committed to the success company"
    },
    {
        logo: logo2,
        heading: "Responsibility",
        subHeading:"Students will always be our top priority"
    },
    {
        logo: logo3,
        heading: "Flexibility",
        subHeading:"Change according to the trends"
    },
    {
        logo: logo4,
        heading: "Solve the Problem",
        subHeading:"Code to find solutions"
    }
]

const TimelineSection = () => {
  return (
    <div className='flex flex-row gap-1 items-center w-11/12 justify-center mt-20 pb-14'>
        <div className='w-1/2 flex flex-col justify-center items-center'>
        <div className='flex flex-col gap-10 items-start'>
            {
                timelineData.map(({logo, heading, subHeading}, index)=>{
                    return (
                        <div key={index} className='flex flex-row justify-start items-center gap-3'>
                            <img src={logo}></img>
                            <div className='flex flex-col '>
                                <p className='text-lg uppercase font-bold text-richblack-700'>{heading}</p>
                                <p className='text-sm text-richblack-500'>{subHeading}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        </div>
        <div className='relative shadow-blue-200 overflow-visible'>
            <img src={timelineImage} alt='TimelineImage' className='shadow-white object-cover h-fit w-10/12'/>
            <div className='w-7/12 border border-white bg-caribbeangreen-700 flex flex-row justify-center items-center p-2 absolute top-[85%] left-[15%] py-10'>
                <div className='flex flex-row justify-center items-center gap-2 border-r border-caribbeangreen-300 w-1/2'>
                    <p className='text-white text-3xl  font-bold '>10+</p>
                    <p className='text-richblack-25  text-sm  w-1/2'>Years of Experience</p>
                </div>
                <div className='flex flex-row justify-center items-center gap-2 border-l border-caribbeangreen-300 w-1/2'>
                    <p className='text-white text-3xl font-bold '>250+</p>
                    <p className='text-richblack-25 text-sm w-1/2'> Types of Courses</p>
                </div>
            </div>

        </div>

    </div>
  )
}

export default TimelineSection