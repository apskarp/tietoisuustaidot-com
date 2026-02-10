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
  async rewrites() {
    return [
      {
        source: '/wp-proxy/:path*',
        destination: 'https://tietoisuustaidot.com/index.php?rest_route=/:path*',
      },
    ];
  },
}

module.exports = nextConfig
