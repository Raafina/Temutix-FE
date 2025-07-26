import { Skeleton } from "@heroui/react";
import HomeEventList from "./HomeEventList";
import HomeSlider from "./HomeSlider";
import useHome from "./useHome";
import Image from "next/image";
import HomeCategoryList from "./HomeCategoryList";

const Home = () => {
  const {
    dataBanners,
    isLoadingBanners,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataCategories,
    isLoadingCategories,
  } = useHome();
  return (
    <div>
      <HomeSlider
        banners={dataBanners?.data}
        isLoadingBanners={isLoadingBanners}
      />
      <HomeEventList
        title="Featured Event"
        events={dataFeaturedEvents?.data}
        isLoading={isLoadingFeaturedEvents}
        urlMore="/event?isFeatured=true"
      />
      <HomeEventList
        title="Latest Event"
        events={dataLatestEvents?.data}
        isLoading={isLoadingLatestEvents}
      />
      <HomeCategoryList
        categories={dataCategories?.data}
        isLoading={isLoadingCategories}
      />
    </div>
  );
};

export default Home;
