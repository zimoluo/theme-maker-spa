"use client";

import { ReactNode, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useSettings } from "../../contexts/SettingsContext";
import { useNavigation } from "@/lib/helperHooks";
import { generateInlineStyleObject } from "@/lib/colorPaletteParser";
import { generateThemeMiscInlineStyle } from "@/lib/themeMiscParser";

interface Props {
  children?: ReactNode;
}

export default function ThemeApplier({ children }: Props) {
  const { themeConfig, setThemeKey } = useTheme();
  const { settings } = useSettings();

  const navigationKey = useNavigation();

  const rawThemePaletteData = themeConfig.palette;
  const rawThemeMiscData = themeConfig.misc ?? {};

  const themePaletteStyleObject =
    generateInlineStyleObject(rawThemePaletteData);
  const themeMiscStyleObject = generateThemeMiscInlineStyle(rawThemeMiscData);
  const themeInlineStyle: Record<string, string> = {
    ...themeMiscStyleObject,
    ...themePaletteStyleObject,
  };

  const siteThemeColor = themeConfig.siteThemeColor;

  useEffect(() => {
    const currentTheme = settings.pageTheme[navigationKey];

    setThemeKey(currentTheme);
  }, [navigationKey, setThemeKey, settings.pageTheme]);

  useEffect(() => {
    let metaThemeColor = document.querySelector("meta[name=theme-color]");

    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta");
      metaThemeColor.setAttribute("name", "theme-color");
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute("content", siteThemeColor);
  }, [siteThemeColor]);

  return <div style={themeInlineStyle}>{children}</div>;
}
