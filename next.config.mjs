/** @type {import('next').NextConfig} */
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
const apiImageHost = new URL(apiBaseUrl).hostname;
const apiImageProtocol = new URL(apiBaseUrl).protocol.replace(":", "");

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: apiImageProtocol,
        hostname: apiImageHost,
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      // Cloudflare tunnel used during local dev/testing
      {
        protocol: "https",
        hostname: "hostel-voices-outreach-mustang.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "acc-secret-princeton-answered.trycloudflare.com",
      },
      // Legacy: old records in DB still point here (old R2 public base URL)
      {
        protocol: "https",
        hostname: "artin-admin-panel.vercel.app",
      },
    ],
  },
};

export default nextConfig;

