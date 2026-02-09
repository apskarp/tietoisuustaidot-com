/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tietoisuustaidot.com',
      },
      {
        protocol: 'http',
        hostname: 'tietoisuustaidot.com',
      },
    ],
  },
}

module.exports = nextConfig
