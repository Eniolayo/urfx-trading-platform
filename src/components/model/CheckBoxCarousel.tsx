// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
// import checkboxDark from "/src/assets/HeroSection/checkbox-dark.png";
// import checkboxLight from "/src/assets/HeroSection/checkbox-light.png";
// import { useAtomValue } from "jotai";
// import { themeAtom } from "@/store/atoms";
// import { useEffect, useState } from "react";
// import GeneralButtonWithCss from "../landing/GeneralButtonWithCss";
import CarouselButton from "../heroSection/CarouselButton";

export default function CheckBoxCarousel({
  checkBoxData,
}: {
  checkBoxData: string[][];
}) {

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        modules={[Autoplay, Pagination]}
        className="sm:w-full w-[95vw] flex justify-center flex-row pb-3 transition-all sm:text-lg text-[14px] 2k:text-[28px]"
      >
        {checkBoxData?.map((checkBoxContent, index) => (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-2 w-full gap-y-2 gap-x-1 mb-5 h-auto sm:gap-5 2k:gap-y-8 2k:gap-x-6 2k:mb-10">
              {checkBoxContent.map((text, i) => (
                // <Checkbox text={text} key={i} />
                <div className="flex items-start w-[95%] h-full space-x-1 sm:space-x-3 2k:space-x-4 dark:text-white text-black">
                  <div key={i} className="2k:pt-0 h-full flex items-start justify-center pt-0 sm:pt-1 ">
                    <CarouselButton />
                  </div>
                  <div className="font-[400] h-full flex items-start  tracking-normal 2k:text-[28px] 2k:items-center">{text}</div>
                </div>
              ))}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
