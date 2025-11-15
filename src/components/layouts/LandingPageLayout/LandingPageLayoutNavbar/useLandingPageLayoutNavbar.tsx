import authServices from "@/services/auth.service";
import eventServices from "@/services/event.service";
import useDebounce from "@/hooks/useDebounce";
import { DELAY, LIMIT_EVENT, PAGE_DEFAULT } from "@/constants/list.constants";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState, ChangeEvent } from "react";

const useLandingPageLayoutNavbar = () => {
  const router = useRouter();
  const debounce = useDebounce();
  const [search, setSearch] = useState("");

  const getProfile = async () => {
    const { data } = await authServices.getProfile();

    return data.data;
  };

  const { data: dataProfile, refetch: refetchProfile } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfile,
    enabled: router.isReady,
  });

  const getEventsSearch = async () => {
    let params = `search=${search}&limit=${LIMIT_EVENT}&page=${PAGE_DEFAULT}`;
    const { data } = await eventServices.getEvents(params);
    return data;
  };

  const {
    data: dataEventsSearch,
    isRefetching: isRefetchingEventsSearch,
    isLoading: isLoadingEventsSearch,
  } = useQuery({
    queryKey: ["EventsSearch", search],
    queryFn: getEventsSearch,
    enabled: !!search,
  });

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    debounce(() => setSearch(e.target.value), DELAY);
  };

  return {
    search,
    dataProfile,
    dataEventsSearch,
    refetchProfile,
    isRefetchingEventsSearch,
    isLoadingEventsSearch,
    setSearch,
    handleSearch,
  };
};

export default useLandingPageLayoutNavbar;
