import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description: "Fully commited to the success company"
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description: "Students will always be our top priority"
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description: "The ability to switch is an important skill"
    },
    {
        Logo: Logo4,
        heading: "Solve the Problem",
        Description: "Code your way to a solution"
    },

]

const TimelineSection = () => {
  return (
    <div>
        <div className='flex flex-row gap-15 items-center '>
            <div className='flex flex-col w-[45%] gap-5'>
                {
                    timeline.map((element, index) => {
                        return (
                            <div className='flex flex-row gap-6' key={index}>
                                <div className='w-[50px] h-[50px] bg-white flex items-center'>
                                    <img src={element.Logo} />
                                </div>
                                <div>
                                    <h2 className='font-semibold text-[18px]'>{element.heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='relative shadow-blue-200'>
                <img src={timelineImage} alt='timelineImage' className=''/>
            </div>
        </div>

    </div>
  )
}

export default TimelineSection