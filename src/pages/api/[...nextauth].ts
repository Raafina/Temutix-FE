
import environment from "@/config/environment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";

const config = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 60 * 24, // one day 
    },
    secret: environment.AUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            credentials: {
                identifier: { label: "identifier", type: "text" },
                password: { label: "password", type: "password" },
            },
            async authorize(
                credentials: Record<"identifier" | "password", string> | undefined,
            ): Promise<UserExtended | null> {
                const { identifier, password } = credentials as {
                    identifier: string;
                    password: string;
                };
                const result = await authServices.login({ identifier, password });
                const accessToken = result.data.data
            }
        }),
    ]
}