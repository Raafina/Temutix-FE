import instance from "@/libs/axios/instance"
import endpoint from "./endpoint.constant"
import { IRegister, IActivation, ILogin } from "@/types/Auth"

const authServices = {
    register: (payload: IRegister) => instance.post(`${endpoint}/register`, payload),
    activation: (payload: IActivation) => instance.post(`${endpoint}/activation`, payload),
    login: (payload: ILogin) => instance.post(`${endpoint.AUTH}/login`, payload),
    getProfileWithToken: (token: string) =>
        instance.get(`${endpoint.AUTH}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }),
}

export default authServices;