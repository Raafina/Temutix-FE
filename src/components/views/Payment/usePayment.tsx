import orderServices from "@/services/order.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const usePayment = () => {
  const router = useRouter();
  const { order_id, status } = router.query;

  const standardizeStatus = (status: string) => {
    switch (status) {
      case "progress":
        return "pending";
      case "success":
        return "completed";
      case "failed":
        return "cancelled";
      default:
        return "pending";
    }
  };

  const updateOrderStatus = async () => {
    const result = await orderServices.updateOrderStatus(
      `${order_id}`,
      standardizeStatus(`${status}`),
    );
  };

  const { mutate: mutateUpdateOrderStatus } = useMutation({
    mutationFn: updateOrderStatus,
  });

  return { mutateUpdateOrderStatus };
};

export default usePayment;
