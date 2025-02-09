import CommandPalette from 'components/CommandPalette';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import ClientLayout from 'components/ClientLayout';
import { Suspense } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { AppSidebar } from 'components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from 'components/ui/sidebar';

export const metadata = {
  title: {
    template: '%s - Mineral',
    default: 'Mineral',
  },
  openGraph: {
    title: {
      template: '%s - Mineral',
      default: 'Mineral',
    },
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
      <body className="overflow-hidden print:overflow-auto">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider className="h-screen print:h-auto">
            <div className="relative">
              <AppSidebar />
              <SidebarTrigger className="absolute -right-8 top-1.5 z-50 print:hidden" />
            </div>
            <main
              className={`page-content min-h-screen w-full overflow-y-auto`}
            >
              <Suspense>
                <CommandPalette />
              </Suspense>
              <ClientLayout>{children}</ClientLayout>
              <Toaster
                position="top-center"
                toastOptions={{
                  classNames: {
                    title: 'font-mono',
                    description: 'font-mono',
                    success:
                      'bg-green-50 text-gray-700 dark:bg-gray-900 dark:text-green-300',
                  },
                }}
              />
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

export default MyApp;
