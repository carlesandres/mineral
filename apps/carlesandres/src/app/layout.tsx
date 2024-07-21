import 'src/styles/main.css';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

export const metadata = {
  title: 'Carles Andrés',
  description: 'Web engineer',
  metadataBase: new URL('https://carlesandres.com'),
  keywords: [
    'web engineer',
    'web developer',
    'software engineer',
    'software developer',
    'fullstack engineer',
    'fullstack developer',
    'frontend engineer',
    'frontend developer',
    'app developer',
    'app engineer',
    'react developer',
    'nextjs developer',
  ],
};

async function MyApp({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script
          defer
          data-domain="carlesandres.com"
          src="https://plausible.io/js/plausible.js"
        ></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" href="/favicon-64x64.png" sizes="64x64" />
        <link rel="icon" href="/favicon-128x128.png" sizes="128x128" />
        <meta name="theme-color" content="#4a4a4a" />
      </head>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}

export default MyApp;
