import Image from "next/image";
import Link from "next/link";
import { NAV_ITEMS, SOCIAL_ITEMS } from "../LandingPageLayout.constants";

const LandingPageLayoutFooter = () => {
  return (
    <div className="bg-slate-900">
      <div className="mx-auto flex max-w-7xl flex-col justify-between px-5 py-10 lg:flex-row lg:text-left">
        <div className="flex gap-4 md:flex-col">
          <Image
            src={"/images/general/logo.png"}
            alt="logo"
            className="mb-10 w-10 md:mb-4 lg:mb-0 lg:w-32"
            width={100}
            height={100}
          />
          <p className="hidden self-center text-xl font-bold text-secondary lg:flex">
            TemuTix
          </p>
        </div>
        <div className="mb-4 flex flex-col gap-4 lg:mb-0">
          <div>
            <h4 className="text-xl font-bold text-secondary">
              Customer Service
            </h4>
            <p className="text-white">
              <Link href="mailto:temutix@example.com">temutix@example.com</Link>{" "}
              | <Link href="tel:+621234567890">+62 1234 5678 90</Link>
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-secondary">Office</h4>
            <p className="text-white">Jl. Jend. Sudriman No. 123, Jakarta</p>
          </div>
        </div>

        <div className="mb-10 flex flex-col gap-2 lg:mb-0">
          <h2 className="text-xl font-bold text-secondary lg:mb-2">Menu</h2>
          {NAV_ITEMS.map((item) => (
            <Link
              key={`footer-nav-${item.label}`}
              href={item.href}
              className="cursor-pointer text-white hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col items-start gap-8 lg:items-center">
          <div className="flex items-center justify-between gap-4 text-white">
            {SOCIAL_ITEMS.map((item) => (
              <Link
                href={item.href}
                className="text-lg hover:text-secondary md:text-3xl"
                key={`footer-social-${item.label}`}
              >
                {item.icon}
              </Link>
            ))}
          </div>
          <p className="w-full text-white lg:text-center">
            Copyright ©{new Date().getFullYear()} Temutix. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPageLayoutFooter;
