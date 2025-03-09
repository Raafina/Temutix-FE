import environment from "@/config/environment";
import axios from "axios";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

interface CustomSession extends Session {
    accesToken?: string
}

const headers = {
    "Content-Type": "application/json",
}

const instance = axios.create({
    baseURL: environment.API_URL,
    headers,
    timeout: 60 * 1000,
});

// Intercept before request 
instance.interceptors.request.use(
    async (request) => {
        const session: CustomSession | null = await getSession();
        if (session && session.accesToken) {
            request.headers.Authorization = `Bearer ${session.accesToken}`
        }
        return request;
    },
    (error) => Promise.reject(error)
)

// Intercept after response
instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
);

export default instance;