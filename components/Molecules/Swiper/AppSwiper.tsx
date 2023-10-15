"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { AppSwiperProps } from "./AppSwiper.types";

const AppSwiper = ({ swiperContent }: AppSwiperProps) => {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {swiperContent.map((item, index) => (
        <SwiperSlide key={index}>{item}</SwiperSlide>
      ))}
    </Swiper>
  );
};
export default AppSwiper;
