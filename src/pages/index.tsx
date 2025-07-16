"use client";

import { Inter } from "next/font/google";
import PageHead from "@/components/commons/PageHead";
import { Button } from "@heroui/react";
import Image from "next/image";
import router from "next/router";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`${inter.className} mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center p-4`}
    >
      <PageHead />
      <div className="space-y-6 rounded-lg border p-10 shadow-lg">
        <Image
          src="/images/general/logo.svg"
          alt="Logo"
          width={200}
          height={200}
        />
        <p>
          Temutix is a comprehensive online platform designed to simplify your
          event experience. Whether youre looking for concerts, workshops,
          sports matches, or cultural festivals, Temutix provides a seamless
          solution for discovering and purchasing tickets for a wide variety of
          events. With an intuitive interface and secure transaction processes,
          Temutix makes finding and securing your spot at any event quick and
          hassle-free.
        </p>
        <Button
          color="secondary"
          onPress={() => {
            router.push("/admin/dashboard");
          }}
        >
          Get Started
        </Button>
      </div>
    </main>
  );
}
