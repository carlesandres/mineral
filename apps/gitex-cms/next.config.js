module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/u/**',
      },
    ],
  },
  eslint: {
    dirs: ['pages', 'components', 'lib', 'utils', 'app', 'hooks'],
  },
  // productionBrowserSourceMaps: process.env.VERCEL !== '1',
  reactStrictMode: true,
};
