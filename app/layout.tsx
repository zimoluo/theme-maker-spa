import type { Metadata } from "next";
import "@/styles/globals.css";
import ThemeApplier from "@/components/theme/util/ThemeApplier";
import MainPageFrame from "@/components/mainPage/MainPageFrame";
import MainPageElements from "@/components/mainPage/MainPageElements";
import { SettingsProvider } from "@/components/contexts/SettingsContext";
import MainPageEffect from "@/components/mainPage/MainPageEffect";
import { baseUrl } from "@/lib/constants/navigationFinder";
import { ToastProvider } from "@/components/contexts/ToastContext";
import ThemeDataInitializer from "@/components/theme/util/ThemeDataInitializer";
import { defaultRobotsMeta } from "@/lib/siteMetadata";
import SystemUIFontLoader from "@/components/mainPage/SystemUIFontLoader";

const environment = "development";

export const metadata: Metadata = {
  title: "Theme Maker",
  description:
    "Customize the appearance and the aesthetics of Zimo Web using theme profiles. Independently hosted.",
  keywords:
    "Zimo Web, Zimo Luo, Color, Personal Website, Color Palette, Palette, Theme, Design, Editor, Web app, Theme Editor, Theme Maker, Interactive, Responsive, Online editor",
  robots: defaultRobotsMeta,
  authors: [{ name: "Zimo", url: "https://github.com/zimoluo" }],
  openGraph: {
    type: "website",
    url: baseUrl,
    title: "Theme Maker",
    description:
      "Customize the appearance and the aesthetics of Zimo Web using theme profiles.",
    siteName: "Theme Maker",
  },
  icons: [
    {
      rel: "icon",
      url: `./website-favicon/${environment}/favicon-32x32.png`,
      type: "image/png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      url: `./website-favicon/${environment}/favicon-96x96.png`,
      type: "image/png",
      sizes: "96x96",
    },
    {
      rel: "icon",
      url: `./website-favicon/${environment}/favicon-192x192.png`,
      type: "image/png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      url: `./website-favicon/${environment}/favicon-1024x1024.png`,
      type: "image/png",
      sizes: "1024x1024",
    },
    {
      rel: "apple-touch-icon",
      url: `./website-favicon/${environment}/favicon-180x180.png`,
      type: "image/png",
      sizes: "180x180",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-main">
        <SettingsProvider>
          <SystemUIFontLoader>
            <ToastProvider>
              <ThemeDataInitializer>
                <ThemeApplier>
                  <MainPageFrame>
                    <MainPageEffect>
                      <MainPageElements>{children}</MainPageElements>
                    </MainPageEffect>
                  </MainPageFrame>
                </ThemeApplier>
              </ThemeDataInitializer>
            </ToastProvider>
          </SystemUIFontLoader>
        </SettingsProvider>
      </body>
    </html>
  );
}
