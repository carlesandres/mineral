import { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import "css/main.css";
import Toast from "components/Toast";
import { ShortcutsProvider } from "hooks/useShortcuts";
import { ListProvider } from "hooks/useList";
import DBUpdater from "components/DBUpdater";
import { appName } from "components/constants";
import { loadFromStorage } from "utils/useSettingsStore";
// import { loadRecommendations } from 'utils/useSettingsStore';
import PleaseWait from "components/PleaseWait";
import { messageReceive } from "utils/fileUtils";
import useSettingsStore from "utils/useSettingsStore";
import BackupModal from "components/BackupModal";
import FileImporter from "components/FileImporter";
import {
  Inter,
  Fira_Code,
  Montserrat,
  Open_Sans,
  Lora,
} from "next/font/google";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://eu.i.posthog.com",
    person_profiles: "identified_only", // or 'always' to create profiles for anonymous users as well
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug(); // debug mode in development
    },
  });
}

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const monofont = Fira_Code({
  subsets: ["latin"],
  variable: "--font-my-mono",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans-2",
});

const opensans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-sans-3",
});

const sofiasans = Lora({
  subsets: ["latin"],
  variable: "--font-sans-4",
});

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  const getLayout = Component.getLayout || ((page: ReactNode) => page);
  const renderedComp = loading ? (
    <PleaseWait />
  ) : (
    getLayout(<Component {...pageProps} />)
  );
  const { darkMode } = useSettingsStore();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    loadFromStorage();
    setLoading(false);
    // loadRecommendations();
  }, []);

  useEffect(() => {
    const setSettingChangeFromOtherTab = (ev: StorageEvent) => {
      const message = messageReceive(ev);
      if (!message) {
        return;
      }
      if (message.command === "settingChange") {
        loadFromStorage();
      }
    };
    if (!loading) {
      window.addEventListener("storage", setSettingChangeFromOtherTab);
      return () => {
        window.removeEventListener("storage", setSettingChangeFromOtherTab);
      };
    }
  }, [loading]);

  // TO-DO: For now, there is a reason why SettingsProvider is here
  // and not in page layout
  return (
    <>
      <Head>
        <title>{`${appName} - Notes Editor`}</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />

        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=1"
        />
        <meta
          name="description"
          content="A quick editor for your private drafts and notes."
        />
      </Head>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <PostHogProvider client={posthog}>
        <ListProvider>
          <ShortcutsProvider>
            <Toast />
            <DBUpdater />
            <div
              className={`${monofont.className} ${montserrat.variable}
              ${sofiasans.variable} ${opensans.variable}`}
            >
              {renderedComp}
            </div>
          </ShortcutsProvider>
          <BackupModal />
          <FileImporter />
        </ListProvider>
      </PostHogProvider>
    </>
  );
}

export default MyApp;
