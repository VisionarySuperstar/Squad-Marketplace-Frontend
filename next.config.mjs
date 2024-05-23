/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["i.ibb.co", "ipfs.io"], // Add the domain of your image here
  },
  webpack: config => {
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
  transpilePackages: ['@uniswap/widgets']
};

export default nextConfig;
