import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold text-richblue-200'>
        {" "}
        {text}
        {" "}
    </span>
    )
}

export default HighlightText

// bg-gradient-to-b from-[text-richblue-200] to-[text-richblue-500]  gradient add later