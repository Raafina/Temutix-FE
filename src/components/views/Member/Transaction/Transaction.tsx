import DataTable from "@/components/ui/DataTable";
import { Chip, useDisclosure } from "@heroui/react";
import { useRouter } from "next/router";
import React, { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LISTS_TRANSACTION } from "./Transaction.constants";
import Image from "next/image";
import useTransaction from "./useTransaction";
import useChangeUrl from "@/hooks/useChangeUrl";
import DropdownAction from "@/components/commons/DropdownAction";

const Transaction = () => {
  const { push, isReady, query } = useRouter();
  const {
    dataTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
    refetchTransactions,
  } = useTransaction();

  const { setUrl } = useChangeUrl();

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  const renderCell = useCallback(
    (transactions: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transactions[columnKey as keyof typeof transactions];

      switch (columnKey) {
        case "status":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue as ReactNode}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              hideButtonDelete
              onPressButtonDetail={() =>
                push(`/member/transaction/${transactions.orderId}`)
              }
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          columns={COLUMN_LISTS_TRANSACTION}
          data={dataTransactions?.data || []}
          emptyContent="Transaction is empty"
          isLoading={isLoadingTransactions || isRefetchingTransactions}
          renderCell={renderCell}
          totalPages={dataTransactions?.pagination.totalPages}
        />
      )}
    </section>
  );
};

export default Transaction;
