/** @type {import('next').NextConfig} */
const nextConfig = {
  // 外部画像の読込みを許可する
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.microcms-assets.io",
      },
    ],
  },
};

export default nextConfig;
