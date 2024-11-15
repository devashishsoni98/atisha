import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { FaPlay } from "react-icons/fa";

const Home = () => {
  return (
    <div>
      {/* SWIPER */}
      <Swiper
        direction="horizontal"
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true} // Enables Swiper's own navigation buttons
        modules={[Pagination, Navigation]}
        className="mySwiper z-0 "
      >
        <SwiperSlide>
          <img
            src="banner.jpg"
            alt="banner"
            className="object-cover w-full h-full pb-8  "
          />
        </SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
      {/* Swiper end */}
      <br />
      <br />
      {/* HEADLINE */}
      <div className="flex justify-center items-center gap-5 p-2 cursor-pointer center-2 text-sm text-white">
        <p className="flex items-center gap-2 primary_color pl-3">
          <FaPlay />
          Watch
        </p>
        <p className="pr-3">Explore your best career options</p>
      </div>
      <br /><br />
      {/* HEADLINE */}
      <div className="flex justify-center items-center">
        <p className="font-bold headline ">
          Discover Your Perfect Career Path with Our AI-Powered Quiz!
        </p>
      </div>
      <br /><br />
      {/* HEADLINE END */}
        <div className="flex justify-center items-center p-4 bg_dark_gray max-w-fit ml-auto mr-auto rounded-full">
          <button className="font-bold text-xl">Take Your Quiz</button>
        </div>
        <br /><br />
        <br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </div>
  );
};

export default Home;
