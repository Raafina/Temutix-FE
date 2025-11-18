import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICart } from "@/types/Ticket";

const orderServices = {

    getOrders: (params?: string) => instance.get(`${endpoint.ORDER}?${params}`),
    getOrdersById: (id: string) => instance.get(`${endpoint.ORDER}/${id}`),
    createOrder: (payload: ICart) => instance.post(endpoint.ORDER, payload),
    deleteOrder: (id: string) => instance.delete(`${endpoint.ORDER}/${id}`),
    updateOrderStatus: (id: string, status: string) =>
        instance.put(`${endpoint.ORDER}/${id}/${status}`),
    getMemberOder: (params: string) => instance.get(`${endpoint.ORDER}/history?${params}`),
    getOrderById: (id: string) => instance.get(`${endpoint.ORDER}/${id}`),
}

export default orderServices;