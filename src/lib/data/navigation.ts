import { BREAKDOWNS_ENABLED } from "@/lib/flags";

const allNavLinks = [
  { label: "The offer", href: "/#offer" },
  { label: "Work", href: "/#work" },
  { label: "About", href: "/about" },
  { label: "Breakdowns", href: "/breakdowns" },
  { label: "Contact", href: "/contact" },
];

export const navLinks = allNavLinks.filter(
  (link) => link.href !== "/breakdowns" || BREAKDOWNS_ENABLED,
);
