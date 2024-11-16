// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Pagination, Navigation } from "swiper/modules";
// import { FaPlay } from "react-icons/fa";

// const Home = () => {
//   return (
//     <div className='w-full min-h-screen '>
//       {/* SWIPER */}
//       <Swiper
//         direction="horizontal"
//         loop={true}
//         pagination={{
//           clickable: true,
//         }}
//         navigation={true} // Enables Swiper's own navigation buttons
//         modules={[Pagination, Navigation]}
//         className="mySwiper z-0 h-[40vh] "
//       >
//         <SwiperSlide>
//           <img
//             src="banner.jpg"
//             alt="banner"
//             className="object-contain w-full h-full pb-8 "
//           />
//         </SwiperSlide>
//         <SwiperSlide>Slide 2</SwiperSlide>
//         <SwiperSlide>Slide 3</SwiperSlide>
//       </Swiper>
//       {/* Swiper end */}
//       <br />
//       <br />
//       {/* HEADLINE */}
//       <div className="flex justify-center bg_primary_color items-center gap-5 p-2 cursor-pointer center-2 text-sm text-white">
//         <p className="flex items-center gap-2 pl-3">
//           <FaPlay />
//           Watch
//         </p>
//         <p className="pr-3">Explore your best career options</p>
//       </div>
//       <br /><br />
//       {/* HEADLINE */}
//       <div className="flex justify-center items-center">
//         <p className="font-bold headline ">
//           Discover Your Perfect Career Path with Our AI-Powered Quiz!
//         </p>
//       </div>
//       <br /><br />
//       {/* HEADLINE END */}
//         <div className="flex justify-center items-center p-4 bg_dark_gray max-w-fit ml-auto mr-auto rounded-full">
//           <button className="font-bold text-xl">Take Your Quiz</button>
//         </div>
//         <br /><br />
//         <br /><br />
//         <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
//         <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
//     </div>
//   );
// };

// export default Home;
import React from "react";
import logo from "../assets/illustration1.jpg";

const Home = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between w-full home-height px-6 lg:px-12">
      {/* Left Section: Text and Button */}
      <div className="flex flex-col items-start justify-center w-full lg:w-1/2 mb-8 lg:mb-0 ml-20">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r bg_primary_color bg-clip-text text-transparent mb-4">
          Lorem, ipsum dolor.
        </h1> <br /><br />
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r bg_primary_color bg-clip-text text-transparent mb-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </h1>
        <p className="text-lg lg:text-xl text-[#0F67B1] font-medium mb-8">
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <button className="bg-[#0F67B1] text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-[#0c5a9a] transition">
          Take Your Quiz
        </button>
      </div>

      {/* Right Section: Image */}
      <div className="w-full lg:w-1/3 flex justify-center">
        <img
          src={logo}
          alt="Career Path"
          className="object-cover w-4/5 lg:w-full h-auto rounded-lg mr-64"
        />
      </div>
    </div>
  );
};

export default Home;
