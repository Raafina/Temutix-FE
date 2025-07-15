import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/router";
import { Chip, useDisclosure } from "@heroui/react";
import useChangeUrl from "@/hooks/useChangeUrl";
import useEvent from "./useEvent";
import Image from "next/image";
import { Key, ReactNode, useCallback, useEffect } from "react";
import { COLUMN_LIST_CATEGORY } from "./Event.constants";
import DropdownAction from "@/components/commons/DropdownAction";
import AddEventModal from "./AddEventModal/AddEventModal";
import DeleteCategoryModal from "./DeleteEventModal";

const Event = () => {
  const { push, isReady, query } = useRouter();
  const { setUrl } = useChangeUrl();
  const {
    dataEvent,
    isLoadingEvent,
    isRefetchingEvent,
    selectedId,
    setSelectedId,
    refetchEvent,
  } = useEvent();

  const addEventModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category];
      switch (columnKey) {
        case "banner":
          return (
            <Image src={`${cellValue}`} alt="icon" width={100} height={200} />
          );
        case "isPublish":
          return (
            <Chip
              color={cellValue ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue === true ? "Published" : "Not Published"}
            </Chip>
          );
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => push(`/admin/event/${category._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${category._id}`);
                deleteCategoryModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [push],
  );

  useEffect(() => {
    if (isReady) {
      setUrl();
    }
  }, [isReady]);

  return (
    <section>
      {Object.keys(query).length > 0 && (
        <DataTable
          buttonTopContentLabel="Create Event"
          columns={COLUMN_LIST_CATEGORY}
          data={dataEvent?.data || []}
          emptyContent="Event is empty"
          isLoading={isLoadingEvent || isRefetchingEvent}
          onClickButtonTopContent={addEventModal.onOpen}
          renderCell={renderCell}
          totalPages={dataEvent?.pagination.totalPages}
        />
      )}

      <AddEventModal {...addEventModal} refetchEvents={refetchEvent} />

      <DeleteCategoryModal
        {...deleteCategoryModal}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchEvent={refetchEvent}
      />
    </section>
  );
};

export default Event;
