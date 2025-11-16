import eventServices from "@/services/event.service";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "@tanstack/react-query";
import ticketServices from "@/services/ticket.service";
import { ICart, ITicket } from "@/types/Ticket";
import { useMemo, useState } from "react";
import { defaultCart } from "./DetailEvent.constants";
import orderServices from "@/services/order.service";
import { useContext } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";

const useDetailEvent = () => {
  const router = useRouter();
  const { setToaster } = useContext(ToasterContext);

  const getEventBySlug = async () => {
    const { data } = await eventServices.getEventBySlug(`${router.query.slug}`);
    return data.data;
  };

  const { data: dataEvent } = useQuery({
    queryKey: ["Event"],
    queryFn: () => getEventBySlug(),
    enabled: router.isReady,
  });

  const getTicketsByEventId = async () => {
    const { data } = await ticketServices.getTicketsByEventId(
      `${dataEvent._id}`,
    );
    return data.data;
  };

  const { data: dataTicket } = useQuery({
    queryKey: ["Ticket"],
    queryFn: () => getTicketsByEventId(),
    enabled: !!dataEvent?._id,
  });

  const [cart, setCart] = useState<ICart>(defaultCart);

  const dataTicketInCart = useMemo(() => {
    if (dataTicket) {
      return dataTicket.find((ticket: ITicket) => ticket._id === cart.ticket);
    }
  }, [dataTicket, cart.ticket]);

  const handleAddToCart = (ticket: string) => {
    setCart({
      events: dataEvent._id,
      ticket,
      quantity: 1,
    });
  };

  const handleChangeQuantity = (type: "increment" | "decrement") => {
    if (type === "increment") {
      if (cart.quantity < dataTicketInCart?.quantity) {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity + 1,
        }));
      }
    } else {
      if (cart.quantity <= 1) {
        setCart(defaultCart);
      } else {
        setCart((prev: ICart) => ({
          ...prev,
          quantity: prev.quantity - 1,
        }));
      }
    }
  };

  const createOrder = async () => {
    const { data } = await orderServices.createOrder(cart);
    return data.data;
  };

  const { mutate: mutateCreateOrder, isPending: isPendingCreateOrder } =
    useMutation({
      mutationFn: () => createOrder(),
      onError: (error) => {
        setToaster({
          type: "error",
          message: error.message,
        });
      },
      onSuccess: (result) => {
        const token = result.payment.token;

        if (!(window as any).snap) {
          setToaster({
            type: "error",
            message: "Midtrans belum siap, coba ulangi beberapa detik lagi.",
          });
          return;
        }

        (window as any).snap.pay(token);
      },
    });

  return {
    dataEvent,
    dataTicket,
    dataTicketInCart,
    cart,
    handleAddToCart,
    handleChangeQuantity,
    mutateCreateOrder,
    isPendingCreateOrder,
  };
};

export default useDetailEvent;
