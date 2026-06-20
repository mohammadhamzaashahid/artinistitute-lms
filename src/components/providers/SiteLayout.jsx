"use client";

import { usePathname } from "next/navigation";
import SiteNavbar from "@/components/layout/SiteNavbar";
import SiteFooter from "@/components/layout/SiteFooter";

export default function SiteLayout({ children }) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#eef2ff_0,transparent_34%),linear-gradient(to_bottom,#ffffff,#f8fafc)]">
      {!isHomePage && <SiteNavbar />}

      <main>{children}</main>

      {!isHomePage && <SiteFooter />}
    </div>
  );
}