/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kg-s3-assets-stage.s3.amazonaws.com',
        port: '',
        pathname: '/subfolder/**',
      },
      {
        protocol: 'https',
        hostname: 'kg-s3-assets.s3.amazonaws.com',
        port: '',
        pathname: '/subfolder/**',
      },
      {
        protocol: 'https',
        hostname: 'kaistore.s3.amazonaws.com',
        port: '',
        pathname: '/subfolder/**',
      },
    ],
  },
  output: process.env.BUILD_STANDALONE === "true" ? "standalone" : undefined,
};

export default nextConfig;
