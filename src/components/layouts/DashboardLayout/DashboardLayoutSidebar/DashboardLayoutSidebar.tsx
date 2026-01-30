import { Button, Listbox, ListboxItem } from "@heroui/react";
import { signOut } from "next-auth/react";
import { JSX } from "react";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { cn } from "@/utils/cn";

interface SidebarItem {
  key: string;
  label: string;
  href: string;
  icon: JSX.Element;
}

interface PropTypes {
  sidebarItems: SidebarItem[];
  isOpen: boolean;
}

const DashboardLayoutSidebar = (props: PropTypes) => {
  const router = useRouter();
  const { sidebarItems, isOpen } = props;
  return (
    <>
      <div
        className={cn(
          "fixed z-50 flex h-screen w-full max-w-[300px] -translate-x-full flex-col justify-between border-r-1 border-default-200 bg-white px-2 py-3 transition-all lg:relative lg:translate-x-0",
          { "translate-x-0": isOpen },
        )}
      >
        <div>
          <div className="flex w-full items-center justify-center gap-2">
            <Image
              src="/images/general/logo.png"
              alt="logo"
              width={100}
              height={100}
              className="w-11"
              onClick={() => router.push("/")}
            />
            <p className="text-xl font-bold text-primary">TemuTix</p>
          </div>
          <div className="mt-3 h-px w-full bg-primary" />
          <Listbox
            items={sidebarItems}
            variant="solid"
            aria-label="Dashboard Menu"
          >
            {(item) => (
              <ListboxItem
                key={item.key}
                value={item.key}
                className={cn("my-0 h-12 text-2xl", {
                  "bg-primary text-secondary": router.pathname.startsWith(
                    item.href,
                  ),
                })}
                startContent={item.icon}
                textValue={item.label}
                aria-labelledby={item.label}
                aria-describedby={item.label}
                as={Link}
                href={item.href}
              >
                <p className="text-small">{item.label}</p>
              </ListboxItem>
            )}
          </Listbox>
        </div>
        <div className="flex items-center p-1">
          <Button
            color="primary"
            fullWidth
            variant="light"
            className="flex justify-start rounded-lg px-2 py-1.5"
            size="lg"
            onPress={() => signOut()}
          >
            <CiLogout /> Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default DashboardLayoutSidebar;
