import React from 'react'

const SpinnerLoader = () => {
  return (
    <div className='absolute top-[45%] left-[45%] bg-opacity-50'><svg className='size-10 animate-spin'/></div>
  )
}

export default SpinnerLoader