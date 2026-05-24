/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "732db643124ef5910b092c69a6231132.r2.cloudflarestorage.com",
        pathname: "/artininstitute-dev/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;


