"use client";

import { ReactNode, useEffect } from "react";
import { isBirthday, isChristmas, isHalloween } from "@/lib/seasonUtil";
import { parseStoredSettings, useSettings } from "../contexts/SettingsContext";
import { defaultSettings } from "@/lib/constants/defaultSettings";
import _ from "lodash";
import ToastBannerReceiver from "../widgets/ToastBannerReceiver";
import ToastDisplayLegacy from "../widgets/ToastDisplayLegacy";

interface Props {
  children?: ReactNode;
}

const toastComponentMap: Record<NotificationStyle, ReactNode> = {
  disabled: null,
  toast: <ToastDisplayLegacy />,
  banner: <ToastBannerReceiver />,
};

const pageKeys: NavigationKey[] = [
  ...(Object.keys(defaultSettings.pageTheme) as NavigationKey[]),
];

const getUniformPageTheme = (
  theme: ThemeKey
): Record<NavigationKey, ThemeKey> => {
  const pageTheme = pageKeys.reduce((themeObject, key) => {
    (themeObject as Record<NavigationKey, ThemeKey>)[key] = theme as ThemeKey;
    return themeObject;
  }, {});
  return pageTheme as Record<NavigationKey, ThemeKey>;
};

export default function MainPageEffect({ children }: Props) {
  const { updateSettings, settings } = useSettings();

  useEffect(() => {
    async function downloadUserInfo(): Promise<SettingsState> {
      const savedRawSettings = localStorage.getItem("websiteSettings");
      const loadedSettings = parseStoredSettings(savedRawSettings || "") || {};

      updateSettings(loadedSettings, false);

      return loadedSettings;
    }

    downloadUserInfo().then((preparedSettings) => {
      if (
        _.isEqual(preparedSettings.pageTheme, defaultSettings.pageTheme) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        updateSettings(
          {
            ...preparedSettings,
            pageTheme: getUniformPageTheme("plainDark"),
          },
          false
        );
      }

      if (isHalloween()) {
        updateSettings(
          {
            ...preparedSettings,
            pageTheme: getUniformPageTheme("halloween"),
          },
          false
        );
      }

      if (isBirthday()) {
        updateSettings(
          {
            ...preparedSettings,
            pageTheme: getUniformPageTheme("birthday"),
          },
          false
        );
      }

      if (isChristmas()) {
        updateSettings(
          {
            ...preparedSettings,
            pageTheme: getUniformPageTheme("christmas"),
          },
          false
        );
      }
    });
  }, []);

  return (
    <>
      {toastComponentMap[settings.notificationStyle]}
      {children}
    </>
  );
}
