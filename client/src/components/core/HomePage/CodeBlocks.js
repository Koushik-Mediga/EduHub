import React from 'react'
import Button from './Button'
import { TypeAnimation } from 'react-type-animation'

const CodeBlocks = ({ alignLeft, headingText, paraText, button1Content, button2Content, linkTo1, linkTo2 }) => {
  return (
    <div className={`flex ${alignLeft ? 'flex-row' : 'flex-row-reverse'} justify-between w-full h-fit mb-16`}>
      <div className='flex flex-col justify-around gap-4 w-5/12'>
        <h2 className='text-3xl font-semibold text-white'>{headingText}</h2>
        <p className='text-sm text-richblack-50'>{paraText}</p>
        <div className='flex flex-row gap-3'>
          <Button text={button1Content} link={linkTo1} active={true} />
          <Button text={button2Content} link={linkTo2} active={false} />
        </div>
      </div>

      <div className='relative bg-richblack-900 border border-richblack-500 flex flex-row p-3 overflow-hidden w-6/12'>
        
        <div className={`absolute top-1/3 left-1/3 w-28 h-28 ${alignLeft? 'bg-blue-25':' bg-pink-25'} rounded-full blur-3xl opacity-30 pointer-events-none`}></div>
        
        <div className='flex flex-col gap-0 w-[10%] text-richblack-400 font-mono text-sm'>
          {Array.from({ length: 11 }, (_, i) => (
            <p key={i}>{i + 1}</p>
          ))}
        </div>

        {/* Animated Code */}
        <div className=' pl-4 text-yellow-100 font-mono text-sm'>
          <TypeAnimation
            sequence={[
              `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" />
  <title>EduHub</title>
</head>
<body>
  <div id="root"></div>
</body>`,
              5000,
              '',
            ]}
            cursor={true}
            repeat={Infinity}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: 'pre-wrap',
              display: 'block',
              width: '100%',
              overflowWrap: 'break-word'
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks
