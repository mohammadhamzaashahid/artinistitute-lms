/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
      },
      // Cloudflare tunnel used during local dev/testing
      {
        protocol: "https",
        hostname: "hostel-voices-outreach-mustang.trycloudflare.com",
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


