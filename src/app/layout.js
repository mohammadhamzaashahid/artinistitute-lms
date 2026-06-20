import "./globals.css";
import { Inter } from "next/font/google";
import AppProviders from "@/components/providers/AppProviders";
import SiteNavbar from "@/components/layout/SiteNavbar";
import SiteFooter from "@/components/layout/SiteFooter";
import SiteLayout from "@/components/providers/SiteLayout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://artininstitute.com",
);
const siteName = "Artin Institute";
const siteDescription =
  "Learn practical career skills with Artin Institute's premium online courses, expert instructors, certificates, and flexible video-based learning.";

export const metadata = {
  metadataBase: siteUrl,
  applicationName: siteName,
  title: {
    default: "Artin Institute | Online Courses & Career Skills",
    template: "%s | Artin Institute",
  },
  description: siteDescription,
  keywords: [
    "Artin Institute",
    "online courses",
    "career skills",
    "professional certificates",
    "video courses",
    "online learning",
    "KHDA certified courses",
  ],
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName,
    title: "Artin Institute | Online Courses & Career Skills",
    description: siteDescription,
    images: [
      {
        url: "/artin-bgr.png",
        width: 579,
        height: 431,
        alt: "Artin Institute logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artin Institute | Online Courses & Career Skills",
    description: siteDescription,
    images: ["/artin-bgr.png"],
  },
  appleWebApp: {
    title: siteName,
    capable: true,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  category: "education",
};

export const viewport = {
  themeColor: "#377dff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-slate-950 antialiased`}
      >
        <AppProviders>
          <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#eef2ff_0,transparent_34%),linear-gradient(to_bottom,#ffffff,#f8fafc)]">
            {/* <SiteNavbar />
            <main>{children}</main>
            <SiteFooter /> */}

            <AppProviders>
              <SiteLayout>{children}</SiteLayout>
            </AppProviders>
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
