import React from 'react'
import {SwiperSlide, Swiper} from "swiper/react"
import {Pagination, Autoplay}  from "swiper/modules"

import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"

import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {
  return (
    <>
    {
      Courses?.length 
      ? (
        <Swiper
          loop={true}
          slidesPerView={1}
          spaceBetween={25}
          modules={[Pagination, Autoplay]}
          pagination={true}
          className='mySwiper'
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            1024: {slidesPerView: 3}
          }}
        >
          {
            Courses?.map((course, index) => (
              <SwiperSlide key={index}>
                <Course_Card course={course} Height={"h-[250px]"}/>
              </SwiperSlide>
            ))
          }
        </Swiper>
      ) :
      (<p>No course found</p>) 
    }
    </>
  )
}

export default CourseSlider