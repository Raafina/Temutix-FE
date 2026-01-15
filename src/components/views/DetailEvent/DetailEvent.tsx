import {
  BreadcrumbItem,
  Breadcrumbs,
  Skeleton,
  Tab,
  Tabs,
} from "@heroui/react";
import useDetailEvent from "./useDetailEvent";
import { FaClock, FaLocationDot } from "react-icons/fa6";
import { convertTime } from "@/utils/date";
import Image from "next/image";
import { ITicket } from "@/types/Ticket";
import DetailEventTicket from "./DetailEventTicket";
import DetailEventCart from "./DetailEventCart";
import Script from "next/script";
import environment from "@/config/environment";
import Head from "next/head";
import { cn } from "@/utils/cn";

const DetailEvent = () => {
  const {
    dataEvent,
    dataTicket,
    dataTicketInCart,
    cart,
    handleAddToCart,
    handleChangeQuantity,
    mutateCreateOrder,
    isPendingCreateOrder,
  } = useDetailEvent();
  return (
    <div className="px-8 md:px-0">
      <Head>
        <title>{dataEvent?.name}</title>
      </Head>

      <Script
        src={environment.MIDTRANS_SNAP_URL}
        data-client-key={environment.MIDTRANS_CLIENT_KEY}
        strategy="afterInteractive"
      />

      <Skeleton
        className="w-full rounded-lg md:h-6 md:w-1/4"
        isLoaded={!!dataEvent?.name}
      >
        <Breadcrumbs className="flex">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/event">Event</BreadcrumbItem>
          <BreadcrumbItem>{dataEvent?.name}</BreadcrumbItem>
        </Breadcrumbs>
      </Skeleton>

      <section className="mt-4 flex flex-col gap-10 lg:flex-row">
        <div className="h-full w-full md:w-4/6">
          <Skeleton
            isLoaded={!!dataEvent?.name}
            className="mb-2 rounded-lg md:h-8"
          >
            <h1 className="text-2xl font-semibold text-secondary">
              {dataEvent?.name}
            </h1>
          </Skeleton>
          <Skeleton
            className="mb-2 w-full rounded-lg md:h-6 md:w-1/2"
            isLoaded={!!dataEvent?.startDate || !!dataEvent?.endDate}
          >
            <div className="flex items-center gap-2 text-foreground-500">
              <FaClock width={16} className="shrink-0" />
              <p>
                {convertTime(dataEvent?.startDate)} -{" "}
                {convertTime(dataEvent?.endDate)}
              </p>
            </div>
          </Skeleton>
          <Skeleton
            className="mb-2 w-full rounded-lg md:h-6 md:w-1/2"
            isLoaded={!!dataEvent?.isOnline || !!dataEvent?.location}
          >
            <div className="flex items-center gap-2 text-foreground-500">
              <FaLocationDot width={16} className="shrink-0" />
              <p>
                {dataEvent?.isOnline ? "Online" : "Offline"}{" "}
                {dataEvent?.isOnline
                  ? ""
                  : ` - ${dataEvent?.location?.address}`}
              </p>
            </div>
          </Skeleton>
          <Skeleton
            className="mb-4 aspect-video w-full"
            isLoaded={!!dataEvent?.banner}
          >
            <Image
              alt="cover"
              src={dataEvent?.banner && dataEvent?.banner}
              className="aspect-video w-full rounded-lg object-cover"
              width={1920}
              height={1080}
            />
          </Skeleton>
          <Tabs aria-label="Tab Detail Event" fullWidth>
            <Tab key="Description" title="Description">
              <h2 className="text-xl font-semibold text-foreground-700">
                About Event
              </h2>
              <Skeleton
                className={cn(
                  "mt-2 w-full rounded-lg",
                  !dataEvent?.description && "h-24 sm:h-28 md:h-32",
                )}
                isLoaded={!!dataEvent?.description}
              >
                <p className="text-foreground-500">{dataEvent?.description}</p>
              </Skeleton>
            </Tab>
            <Tab key="Ticket" title="Ticket">
              <h2 className="text-xl font-semibold text-foreground-700">
                Ticket
              </h2>
              <div className="mt-2 flex flex-col gap-8">
                {dataTicket?.map((ticket: ITicket) => (
                  <DetailEventTicket
                    key={`ticket-${ticket._id}`}
                    ticket={ticket}
                    cart={cart}
                    handleAddToCart={() => handleAddToCart(`${ticket._id}`)}
                  />
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
        <div className="w-full lg:w-2/6">
          <DetailEventCart
            cart={cart}
            dataTicketInCart={dataTicketInCart}
            onChangeQuantity={handleChangeQuantity}
            onCreateOrder={mutateCreateOrder}
            isLoading={isPendingCreateOrder}
          />
        </div>
      </section>
    </div>
  );
};

export default DetailEvent;
