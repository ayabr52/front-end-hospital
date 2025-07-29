import React from 'react'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
export default function Home() {

    const images = [
    'https://farzathpu.com/wp-content/uploads/2025/03/photo_2025-03-23_16-32-15.jpg',
    'https://farzathpu.com/wp-content/uploads/2025/03/photo_2025-03-23_16-31-53.jpg',
    'https://farzathpu.com/wp-content/uploads/2025/03/202095024_202251818436009_9001660653774683447_n.jpg',
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Image Section */}
    <section id="home" className="relative h-[500px] md:h-[600px]">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url('${img}')` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>

        {/* Blue bar section below the image */}
        <section className="bg-blue-800 text-white p-8 text-center w-full">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              أهلاً بك في مستشفى الدكتور فرزات أيوب الجامعي
            </h1>
            <p className="text-lg md:text-xl">
              نحن هنا لتقديم أفضل رعاية صحية لك ولعائلتك.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
