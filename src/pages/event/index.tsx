"use client";

import { Inter } from "next/font/google";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Event from "@/components/views/Event";
const inter = Inter({ subsets: ["latin"] });

const EventPage = () => {
  return (
    <LandingPageLayout>
      <Event />
    </LandingPageLayout>
  );
};

export default EventPage;
