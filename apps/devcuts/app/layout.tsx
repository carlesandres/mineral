import 'app/globals.css';
import DesktopNav from 'components/DesktopNav';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async (props: LayoutProps) => {
  const { children } = props;

  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="devcuts.16protons.com"
          src="https://plausible.io/js/plausible.js"
        ></script>
        <meta
          name="description"
          content="Create, share and discover the best developer cheatsheets"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link
          rel="icon"
          href="/sheets.png"
          type="image/png"
          sizes="1000x1000"
        />
        {/* <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" /> */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#4a4a4a" />
      </head>
      <body>
        <DesktopNav />
        {children}
      </body>
    </html>
  );
};

export default Layout;
