import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import ticketServices from "@/services/ticket.service";
import { ITicket } from "@/types/Ticket";
import { useMutation } from "@tanstack/react-query";
import { ToasterContext } from "@/contexts/ToasterContext";
import { useContext } from "react";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  name: yup.string().required("Please input name"),
  price: yup.string().required("Please input price"),
  quantity: yup.string().required("Please input quantity"),
  description: yup.string().required("Please input description"),
});

const useUpdateTicketModal = (id: string) => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);
  const {
    control,
    handleSubmit: handleSubmitForm,
    formState: { errors },
    reset,
    setValue: setValueUpdateTicket,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const updateTicket = async (payload: ITicket) => {
    const res = await ticketServices.updateTicket(id, payload);
    return res;
  };

  const {
    mutate: mutateUpdateTicket,
    isPending: isPendingMutateUpdateTicket,
    isSuccess: isSuccessMutateUpdateTicket,
  } = useMutation({
    mutationFn: updateTicket,
    onSuccess: () => {
      setToaster({
        type: "success",
        message: "Update ticket success",
      });
    },
    onError: (error) => {
      setToaster({
        type: "error",
        message: error.message,
      });
    },
  });

  const handleUpdateTicket = (data: ITicket) => {
    data.events = `${router.query.id}`;
    data.price = Number(data.price);
    data.quantity = Number(data.quantity);
    mutateUpdateTicket(data);
  };

  return {
    control,
    errors,
    isPendingMutateUpdateTicket,
    isSuccessMutateUpdateTicket,
    handleUpdateTicket,
    handleSubmitForm,
    updateTicket,
    reset,
    setValueUpdateTicket,
  };
};

export default useUpdateTicketModal;
