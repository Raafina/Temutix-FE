import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IBanner } from "@/types/Banner";

const bannerServices = {
    getBanners: () => instance.get(`${endpoint.BANNER}`),
    getBannerById: (id: string) => instance.get(`${endpoint.BANNER}/${id}`),
    addBanner: (payload: IBanner) => instance.post(`${endpoint.BANNER}`, payload),
    updateBanner: (id: string, payload: IBanner) => instance.put(`${endpoint.BANNER}/${id}`, payload),
    deleteBanner: (id: string) => instance.delete(`${endpoint.BANNER}/${id}`),
}

export default bannerServices