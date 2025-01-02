import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['app', 'components', 'hooks', 'utils', 'types'],
  },
};

if (process.env.BUILD_STATIC === 'true') {
  nextConfig.output = 'export';
}

export default nextConfig;
