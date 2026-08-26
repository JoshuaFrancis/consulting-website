"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

// Routes that render with NO header/footer (lead-magnet landing pages, etc.).
// A landing page's only job is the form — navigation is a conversion killer.
const BARE_ROUTES = ["/audit"];

export function SiteShell({
  header,
  footer,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const bare = BARE_ROUTES.some(
    (r) => pathname === r || pathname.startsWith(`${r}/`),
  );

  return (
    <>
      {!bare && header}
      <main>{children}</main>
      {!bare && footer}
    </>
  );
}
