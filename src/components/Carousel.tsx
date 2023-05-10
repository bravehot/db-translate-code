"use client";
import Image from "next/image";
import { Button, Carousel as CarouselAntd } from "antd";

import screen1 from "../../public/screen1.png";
import screen2 from "../../public/screen2.png";
import screen3 from "../../public/screen3.png";

const Carousel = () => {
  return (
    <section className="w-2/3">
      <CarouselAntd
        effect="fade"
        autoplay
        autoplaySpeed={5000}
        className="w-full"
      >
        <div>
          <Image
            className="w-full"
            style={{ height: "auto" }}
            src={screen1}
            alt="screen"
          />
        </div>

        <div>
          <Image
            className="w-full"
            src={screen2}
            alt="screen"
            style={{ height: "auto" }}
          />
        </div>

        <div>
          <Image
            src={screen3}
            alt="screen"
            className="w-full"
            style={{ height: "auto" }}
          />
        </div>
      </CarouselAntd>
    </section>
  );
};

export default Carousel;
