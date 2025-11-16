import { Fragment, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@heroui/react";
import DataTable from "@/components/ui/DataTable";
import { COLUMN_LISTS_TICKET } from "./TicketTab.constants";
import useTicketTab from "./useTicketTab";
import { ReactNode, useCallback, Key } from "react";
import { convertIDR } from "@/utils/currency";
import AddTicketModal from "./AddTicketModal";
import DropdownAction from "@/components/commons/DropdownAction";
import { ITicket } from "@/types/Ticket";
import UpdateTicketModal from "./UpdateTicketModal";
import DeleteTicketModal from "./DeleteTicketModal";

const TicketTab = () => {
  const addTicketModal = useDisclosure();
  const updateTicketModal = useDisclosure();
  const deleteTicketModal = useDisclosure();

  const { dataTicket, refetchTicket, isPendingTicket, isRefetchingTicket } =
    useTicketTab();
  const [selectedDataTicket, setSelectedDataTicket] = useState<ITicket | null>(
    null,
  );

  const renderCell = useCallback(
    (ticket: Record<string, unknown>, columnKey: Key) => {
      const cellValue = ticket[columnKey as keyof typeof ticket];

      switch (columnKey) {
        case "price":
          return `${convertIDR(cellValue as number)}`;
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => {
                setSelectedDataTicket(ticket as ITicket);
                updateTicketModal.onOpen();
              }}
              onPressButtonDelete={() => {
                setSelectedDataTicket(ticket as ITicket);
                deleteTicketModal.onOpen();
              }}
            />
          );
        default:
          return cellValue as ReactNode;
      }
    },
    [],
  );

  return (
    <Fragment>
      <Card className="w-full p-4">
        <CardHeader className="items-center justify-between">
          <div className="flex flex-col items-center">
            <h1 className="w-full text-xl font-bold">Event Ticket</h1>
            <p className="w-full text-small text-default-400">
              Manage ticket of this event
            </p>
          </div>
          <Button color="secondary" onPress={addTicketModal.onOpen}>
            Add New Ticket
          </Button>
        </CardHeader>
        <CardBody className="pt-0">
          <DataTable
            columns={COLUMN_LISTS_TICKET}
            data={dataTicket || []}
            emptyContent="Ticket is empty"
            isLoading={isPendingTicket || isRefetchingTicket}
            renderCell={renderCell}
            showLimit={false}
            showSearch={false}
            totalPages={1}
          />
        </CardBody>
      </Card>

      <AddTicketModal {...addTicketModal} refetchTicket={refetchTicket} />

      <UpdateTicketModal
        {...updateTicketModal}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
        refetchTicket={refetchTicket}
      />

      <DeleteTicketModal
        {...deleteTicketModal}
        selectedDataTicket={selectedDataTicket}
        setSelectedDataTicket={setSelectedDataTicket}
        refetchTicket={refetchTicket}
      />
    </Fragment>
  );
};

export default TicketTab;
