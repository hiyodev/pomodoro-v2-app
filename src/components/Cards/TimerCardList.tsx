import { TimerCard } from "./TimerCard";

// Swiper Import
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper/modules";

import "./styles.css";

export const TimerCardList = (): JSX.Element => {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 100,
          depth: 400,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        <SwiperSlide>
          <TimerCard />
        </SwiperSlide>
        <SwiperSlide>
          <TimerCard />
        </SwiperSlide>
        <SwiperSlide>
          <TimerCard />
        </SwiperSlide>
        <SwiperSlide>
          <TimerCard />
        </SwiperSlide>
        <SwiperSlide>
          <TimerCard />
        </SwiperSlide>
        <SwiperSlide>
          <TimerCard />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
