import { NextConfig } from 'next';
import VCToolbar from '@vercel/toolbar/plugins/next';

const withVercelToolbar = VCToolbar();

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['app', 'components', 'hooks', 'utils', 'types'],
  },
};

if (process.env.BUILD_STATIC === 'true') {
  nextConfig.output = 'export';
}

export default withVercelToolbar(nextConfig);
