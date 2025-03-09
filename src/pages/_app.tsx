import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { cn } from "@/utils/cn";
import { HeroUIProvider } from "@heroui/react";
import { Inter } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false, // for not looping touch API
    },
  },
});
export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <main
          className={cn(
            inter.className,
            "flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py-0",
          )}
        >
          <Component {...pageProps} />;
        </main>
      </HeroUIProvider>
    </QueryClientProvider>
  );
}
