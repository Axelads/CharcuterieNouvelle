"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";


export default function CustomCarousel() {
  const images = [
    "/images/carousel/accompagnement.jpg",
    "/images/carousel/couronne_agneau.jpg",
    "/images/carousel/cuisine_jeune.jpg",
    "/images/carousel/preparation.jpg",
    "/images/carousel/remorque_noel.jpg",
  ];

  return (
    <div className="carousel-container">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <Image src={src} alt={`Slide ${index + 1}`} width={500} height={600} className="carousel-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
