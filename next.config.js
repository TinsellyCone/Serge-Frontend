/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   async rewrites() {
//     return [
//       {
//         source: '/api/:path*',
//         destination: 'http://192.168.0.45:8008/api/:path*'
//       }
//     ]
//   }
// }

// module.exports = nextConfig

module.exports = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://192.168.0.45:8008/api/:path*'
      }
    ]
  }
}