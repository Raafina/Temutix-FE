import instance from "@/libs/axios/instance"
import endpoint from "./endpoint.contant"
import { IRegister } from "@/types/Auth"

const authServices = {
    register: (payload: IRegister) => instance.post(`/auth/register`, payload)
}

export default authServices;