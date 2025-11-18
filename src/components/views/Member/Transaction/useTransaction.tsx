import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import useChangeUrl from "@/hooks/useChangeUrl";
import orderServices from "@/services/order.service";

const useTransaction = () => {
  const router = useRouter();
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();

  const getMemberTransactions = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}`;
    if (currentSearch) {
      params += `&search=${currentSearch}`;
    }
    const res = await orderServices.getMemberOder(params);
    const { data } = res;
    return data;
  };

  const {
    data: dataTransactions,
    isLoading: isLoadingTransactions,
    isRefetching: isRefetchingTransactions,
    refetch: refetchTransactions,
  } = useQuery({
    queryKey: ["MemberTransactionss", currentPage, currentLimit, currentSearch],
    queryFn: getMemberTransactions,
    enabled: router.isReady && !!currentPage && !!currentLimit,
  });

  return {
    dataTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
    refetchTransactions,
  };
};

export default useTransaction;
