"use client";

import { Inter } from "next/font/google";
import LandingPageLayout from "@/components/layouts/LandingPageLayout";
import Home from "@/components/views/Home";
const inter = Inter({ subsets: ["latin"] });

const HomePage = () => {
  return (
    <LandingPageLayout>
      <Home />
    </LandingPageLayout>
  );
};

export default HomePage;
