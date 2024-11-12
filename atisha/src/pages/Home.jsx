import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const Home = () => {
  return (
    <div>
      <Swiper
        direction="horizontal"
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true} // Enables Swiper's own navigation buttons
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img src="banner.jpg" alt="banner" className='object-cover w-full h-full pb-8' /></SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Home;
