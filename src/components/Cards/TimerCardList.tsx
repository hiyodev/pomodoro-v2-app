import { TimerCard } from "./TimerCard";

// Swiper Import
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import "swiper/css";
import "./swiperStyles.css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow } from "swiper/modules";

import { useState, useEffect } from "react";

// Redux
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { switchCard } from "../../redux/timerSlice";

export const TimerCardList = (): JSX.Element => {
  const cards = useSelector((state: RootState) => state.timer.cards);
  const selectedCard = useSelector(
    (state: RootState) => state.timer.selectedCard
  );
  const dispatch = useDispatch();

  const [sliderInstance, setSliderInstance] = useState<SwiperClass | null>(
    null
  );

  useEffect(() => {
    if (sliderInstance !== null && !sliderInstance.destroyed) {
      sliderInstance.slideTo(Number(selectedCard));
    }
  }, [sliderInstance]);

  const cardData = cards.map((currCard, index) => (
    <SwiperSlide key={currCard.id}>
      <TimerCard cardId={index} title={currCard.title} />
    </SwiperSlide>
  ));

  return (
    <>
      <Swiper
        onInit={(e) => setSliderInstance(e)}
        onSlideChange={(e) => dispatch(switchCard(e.activeIndex))}
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
