import { Metadata } from 'next';

const productionUrl = 'https://mnral.com';
const baseUrl =
  process.env.NODE_ENV === 'production'
    ? new URL(productionUrl)
    : new URL(`http://localhost:${process.env.PORT || 3000}`);

const description =
  'A minimalistic editor for your quick notes. With Markdown support. Fully private notes.';

const siteName = 'Mineral';

export const openGraph = {
  type: 'website',
  locale: 'en_US',
  url: baseUrl,
  siteName,
  title: {
    template: '%s',
    default: siteName,
  },
  description,
  images: [
    {
      url: `${productionUrl}/opengraph-image`,
      width: 1200,
      height: 630,
      alt: siteName,
    },
  ],
};

export const fullCommonMetadata: Metadata = {
  title: {
    template: '%s',
    default: siteName,
  },
  description,
  metadataBase: baseUrl,
  keywords: [
    'notes',
    'productivity',
    'markdown',
    'drafts',
    'minimalistic',
    'focus',
  ],
  authors: [{ name: 'Carles Andrés', url: 'https://carlesandres.com' }],
  robots: 'index, follow',
  openGraph,
};
