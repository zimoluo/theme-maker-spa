import type { Metadata } from "next";
import "@/styles/globals.css";
import ThemeApplier from "@/components/themeUtil/ThemeApplier";
import MainPageFrame from "@/components/mainPage/MainPageFrame";
import MainPageElements from "@/components/mainPage/MainPageElements";
import { SettingsProvider } from "@/components/contexts/SettingsContext";
import MainPageEffect from "@/components/mainPage/MainPageEffect";
import { baseUrl } from "@/lib/constants/navigationFinder";
import { ToastProvider } from "@/components/contexts/ToastContext";
import ThemeDataInitializer from "@/components/themeUtil/ThemeDataInitializer";
import { defaultRobotsMeta } from "@/lib/siteMetadata";

const environment = "development";

export const metadata: Metadata = {
  title: "Theme Maker of Zimo Web",
  description:
    "Customize the appearance and the aesthetics of Zimo Web using theme profiles. Independently hosted.",
  keywords:
    "Zimo Web, Zimo Luo, Color, Personal Website, Color Palette, Palette, Theme, Design, Editor, Web app, Theme Editor, Theme Maker, Interactive, Responsive, Online editor",
  robots: defaultRobotsMeta,
  authors: [{ name: "Zimo", url: "https://github.com/zimoluo" }],
  openGraph: {
    type: "website",
    url: baseUrl,
    title: "Theme Maker of Zimo Web",
    description:
      "TCustomize the appearance and the aesthetics of Zimo Web using theme profiles.",
    siteName: "Zimo Web",
  },
  icons: [
    {
      rel: "icon",
      url: `/website-favicon/${environment}/favicon-32x32.png`,
      type: "image/png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      url: `/website-favicon/${environment}/favicon-96x96.png`,
      type: "image/png",
      sizes: "96x96",
    },
    {
      rel: "icon",
      url: `/website-favicon/${environment}/favicon-192x192.png`,
      type: "image/png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      url: `/website-favicon/${environment}/favicon-1024x1024.png`,
      type: "image/png",
      sizes: "1024x1024",
    },
    {
      rel: "apple-touch-icon",
      url: `/website-favicon/${environment}/favicon-180x180.png`,
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
        </SettingsProvider>
      </body>
    </html>
  );
}
