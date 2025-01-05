import CommandPalette from 'components/CommandPalette';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import 'styles/main.css';
import ClientLayout from 'components/ClientLayout';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { AppSidebar } from 'components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from 'components/ui/sidebar';

export const metadata = {
  title: 'Mineral',
  openGraph: {
    title: 'Mineral',
    description:
      'A minimalistic editor for your quick notes. Markdown support. Fully private notes.',
  },
};

async function MyApp({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          defer
          data-domain="mnral.com"
          src="https://plausible.io/js/script.tagged-events.js"
        ></script>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#4a4a4a" />
      </head>
      <body className="overflow-hidden">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider className="h-screen">
            <div className="relative">
              <AppSidebar />
              <SidebarTrigger className="absolute -right-8 top-1.5 z-50" />
            </div>
            <main
              className={`page-content min-h-screen w-full overflow-y-auto`}
            >
              <Suspense>
                <CommandPalette />
              </Suspense>
              <ClientLayout>{children}</ClientLayout>
              <Toaster richColors position="top-center" />
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default MyApp;
