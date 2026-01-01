/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.1.0.10",
        port: "9999",
        pathname: "/static/**",
      },
    ],
  },
};

module.exports = nextConfig;
