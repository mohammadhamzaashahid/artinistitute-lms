import "./globals.css";
import { Inter } from "next/font/google";
import AppProviders from "@/components/providers/AppProviders";
import SiteNavbar from "@/components/layout/SiteNavbar";
import SiteFooter from "@/components/layout/SiteFooter";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Artin Institute",
  description: "Learn through premium audio and video courses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-slate-950 antialiased`}>
        <AppProviders>
          <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#eef2ff_0,transparent_34%),linear-gradient(to_bottom,#ffffff,#f8fafc)]">
            <SiteNavbar />
            <main>{children}</main>
            <SiteFooter />
          </div>
        </AppProviders>
      </body>
    </html>
  );
}