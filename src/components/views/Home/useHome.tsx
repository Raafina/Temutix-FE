import {
  LIMIT_BANNER,
  LIMIT_CATEGORY,
  LIMIT_EVENT,
  PAGE_DEFAULT,
} from "@/constants/list.constants";
import bannerServices from "@/services/banner.service";
import categoryServices from "@/services/category.service";
import eventServices from "@/services/event.service";
import { useQuery } from "@tanstack/react-query";

/* helper lokal, tidak mengubah file lain */
const buildQueryParams = (
  params: Record<string, string | number | boolean | undefined>,
) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
};

const useHome = () => {
  /* ================= BANNERS ================= */
  const getBanners = async () => {
    const params = buildQueryParams({
      limit: LIMIT_BANNER,
      page: PAGE_DEFAULT,
    });

    const res = await bannerServices.getBanners(params);
    const { data } = res;
    return data;
  };

  const { data: dataBanners, isLoading: isLoadingBanners } = useQuery({
    queryKey: ["Banners", LIMIT_BANNER, PAGE_DEFAULT],
    queryFn: getBanners,
  });

  /* ================= CATEGORIES ================= */
  const getCategories = async () => {
    const params = buildQueryParams({
      limit: LIMIT_CATEGORY,
      page: PAGE_DEFAULT,
    });

    const res = await categoryServices.getCategories(params);
    const { data } = res;
    return data;
  };

  const { data: dataCategories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ["Categories", LIMIT_CATEGORY, PAGE_DEFAULT],
    queryFn: getCategories,
  });

  /* ================= EVENTS ================= */
  const getEvents = async (params: string) => {
    const res = await eventServices.getEvents(params);
    const { data } = res;
    return data;
  };

  const baseEventParams = {
    limit: LIMIT_EVENT,
    page: PAGE_DEFAULT,
    isPublish: true,
  };

  const featuredEventQuery = buildQueryParams({
    ...baseEventParams,
    isFeatured: true,
  });

  const latestEventQuery = buildQueryParams(baseEventParams);

  const { data: dataFeaturedEvents, isLoading: isLoadingFeaturedEvents } =
    useQuery({
      queryKey: ["FeaturedEvents", featuredEventQuery],
      queryFn: () => getEvents(featuredEventQuery),
    });

  const { data: dataLatestEvents, isLoading: isLoadingLatestEvents } = useQuery(
    {
      queryKey: ["LatestEvents", latestEventQuery],
      queryFn: () => getEvents(latestEventQuery),
    },
  );

  return {
    dataBanners,
    isLoadingBanners,
    dataFeaturedEvents,
    isLoadingFeaturedEvents,
    dataLatestEvents,
    isLoadingLatestEvents,
    dataCategories,
    isLoadingCategories,
  };
};

export default useHome;
