import { TimerCard } from "./TimerCard";

// Swiper Import
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow } from "swiper/modules";

import "./swiperStyles.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export const TimerCardList = (): JSX.Element => {
  const cards = useSelector((state: RootState) => state.timer.cards);
  const [selectedCard, setSelectedCard] = useState<string | number>(0);
  const [sliderInstance, setSliderInstance] = useState<SwiperClass | null>(
    null
  );

  useEffect(() => {
    if (sliderInstance !== null && !sliderInstance.destroyed) {
      sliderInstance.slideTo(Number(selectedCard));
    }
  }, [sliderInstance]);

  useEffect(() => {
    localStorage.setItem("cardID", JSON.stringify(selectedCard));
  }, [selectedCard]);

  const cardData = cards.map((currCard, index) => (
    <SwiperSlide key={currCard.id}>
      <TimerCard cardId={index} title={currCard.title} />
    </SwiperSlide>
  ));

  return (
    <>
      <Swiper
        onInit={(e) => setSliderInstance(e)}
        onSlideChange={(e) => setSelectedCard(e.activeIndex)}
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
        {cardData}
      </Swiper>
    </>
  );
};
