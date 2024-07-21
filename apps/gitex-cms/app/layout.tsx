import 'app/globals.css';
import 'tailwindcss/tailwind.css';
import { Inter, JetBrains_Mono } from 'next/font/google';
import DesktopNav from '@/components/DesktopNav';
import MobileNav from '@/components/MobileNav';
import { Toaster } from 'react-hot-toast';
import fetchSupabase from '@/utils/fetch-supabase';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const monofont = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-my-mono',
});

async function MyApp({ children }: { children: React.ReactNode }) {
  const res = await fetchSupabase(
    'examples?select=*&draft=eq.false&order=difficulty.asc',
  );
  if (res.status !== 200) {
    console.log('res.status', res.status);
    return <div>Something went wrong</div>;
  }
  const examples = await res.json();

  return (
    <html lang="en">
      <head>
        <script
          defer
          data-domain="gitexamples.com"
          src="https://plausible.io/js/plausible.js"
        ></script>
        <meta
          name="description"
          content="Learn git easily with examples. Progress from beginner to expert level in tiny steps. Focus only on what you don't know yet. "
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#4a4a4a" />
      </head>
      <body className="bg-gray-50 min-h-screen">
        <div>
          <Toaster />
          <DesktopNav />
          <div className={`${inter.variable} ${monofont.variable}`}>
            {children}
          </div>
          <MobileNav />
        </div>
        <div id="modal-root" />
      </body>
    </html>
  );
}

export default MyApp;
