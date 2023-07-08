import { TimerCard } from "./TimerCard";

// Swiper Import
import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow } from "swiper/modules";

import "./styles.css";
import { useState, useEffect } from "react";

const userData = {
  selectedCard: 0,
  timeData: [
    {
      id: 1,
      cardTitle: "Card 1111",
      timeDuration: 3600,
    },
    // {
    //   id: 2,
    //   cardTitle: "Card 22222",
    //   timeDuration: 3600,
    // },
    // {
    //   id: 3,
    //   cardTitle: "Card 33333",
    //   timeDuration: 3600,
    // },
  ],
};

// MAJOR BUG: Sometimes cardID is null resulting in cards being bugged on restart for some reason...

export const TimerCardList = (): JSX.Element => {
  const [selectedCard, setSelectedCard] = useState<string | number>(
    0
    //localStorage.getItem("cardID") || 0
  );
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

  const cardData = userData.timeData.map((currCard, index) => (
    <SwiperSlide key={currCard.id}>
      <TimerCard cardId={index} title={currCard.cardTitle} />
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
