import { TimerCard } from "./TimerCard";

// Swiper Import
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow } from "swiper/modules";

import "./styles.css";
import { useState, useEffect } from "react";

const timeData = [
  {
    id: 1,
    cardTitle: "Card 1",
    timeDuration: 3600,
  },
  {
    id: 2,
    cardTitle: "Card 2",
    timeDuration: 3600,
  },
];

export const TimerCardList = (): JSX.Element => {
  const [sliderInstance, setSliderInstance] = useState<SwiperClass | null>(
    null
  );

  useEffect(() => {
    if (sliderInstance !== null && !sliderInstance.destroyed) {
      console.log(sliderInstance);
      sliderInstance.slideTo(1);
    }
  }, [sliderInstance]);

  return (
    <>
      <Swiper
        onInit={(e) => setSliderInstance(e)}
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
          <TimerCard title="Card 1" />
        </SwiperSlide>
        <SwiperSlide>
          <TimerCard title="Card 2" />
        </SwiperSlide>
        <SwiperSlide>
          <TimerCard title="Card 3" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};
