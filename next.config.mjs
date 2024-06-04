/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "ipfs.io",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
  transpilePackages: ["@uniswap/widgets"],
};

export default nextConfig;
