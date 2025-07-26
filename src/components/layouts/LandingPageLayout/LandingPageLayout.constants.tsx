import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/event" },
];

const BUTTON_ITEMS = [
  { label: "Register", href: "/auth/register", variant: "bordered" },
  { label: "Login", href: "/auth/login", variant: "solid" },
];

const SOCIAL_ITEMS = [
  {
    label: "Facebook",
    href: "/",
    icon: <FaFacebook />,
  },
  {
    label: "Instagram",
    href: "/",
    icon: <FaInstagram />,
  },
  {
    label: "TikTok",
    href: "/",
    icon: <FaTiktok />,
  },
  {
    label: "Twitter",
    href: "/",
    icon: <FaTwitter />,
  },
  {
    label: "YouTube",
    href: "/",
    icon: <FaYoutube />,
  },
];

export { NAV_ITEMS, BUTTON_ITEMS, SOCIAL_ITEMS };
