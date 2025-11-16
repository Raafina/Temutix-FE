import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICart } from "@/types/Ticket";

const orderServices = {

    getOrders: (params?: string) =>
        instance.get(`${endpoint.CATEGORY}?${params}`),
    getCategoryById: (id: string) => instance.get(`${endpoint.CATEGORY}/${id}`),
    createOrder: (payload: ICart) => instance.post(endpoint.ORDER, payload),
    deleteCategory: (id: string) => instance.delete(`${endpoint.CATEGORY}/${id}`),
    updateCategory: (id: string, payload: ICart) =>
        instance.put(`${endpoint.CATEGORY}/${id}`, payload),
}

export default orderServices;