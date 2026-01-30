import { IBanner } from "@/types/Banner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Skeleton } from "@heroui/react";
import Image from "next/image";

interface PropTypes {
  banners: IBanner[];
  isLoadingBanners: boolean;
}

const HomeSlider = (props: PropTypes) => {
  const { banners, isLoadingBanners } = props;
  return (
    <div className="mx-6 mb-6 lg:mx-0 lg:mb-16">
      {!isLoadingBanners ? (
        <Swiper
          pagination={{
            dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={30}
          loop
          modules={[Autoplay, Pagination]}
          className="h-full w-full"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {banners?.map((banner: IBanner) => (
            <SwiperSlide key={banner._id}>
              <div className="relative aspect-[16/3.5] w-full">
                <Image
                  src={`${banner.image}`}
                  alt={`${banner.title}`}
                  fill
                  className="rounded-2xl object-cover"
                  priority={banners.indexOf(banner) === 0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Skeleton className="h-[90%] w-full rounded-2xl" />
      )}
    </div>
  );
};

export default HomeSlider;
