import instance from "@/libs/axios/instance"
import endpoint from "./endpoint.constant"
import { IRegister, IActivation } from "@/types/Auth"

const authServices = {
    register: (payload: IRegister) => instance.post(`/auth/register`, payload),
    activation: (payload: IActivation) => instance.post(`/auth/activation`, payload),
}

export default authServices;