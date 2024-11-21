export default {
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
    dirs: ['@', 'components', 'lib', 'utils', 'app'],
  },
  // productionBrowserSourceMaps: process.env.VERCEL !== '1',
};
