"use client";

import { ReactNode, useEffect } from "react";
import { parseStoredSettings, useSettings } from "../contexts/SettingsContext";
import ToastBannerReceiver from "../widgets/ToastBannerReceiver";
import ToastDisplayLegacy from "../widgets/ToastDisplayLegacy";
import PopUpManager from "../widgets/PopUpManager";
import WindowManager from "../widgets/WindowManager";

interface Props {
  children?: ReactNode;
}

const toastComponentMap: Record<NotificationStyle, ReactNode> = {
  disabled: null,
  toast: <ToastDisplayLegacy />,
  banner: <ToastBannerReceiver />,
};

export default function MainPageEffect({ children }: Props) {
  const { updateSettings, settings } = useSettings();

  useEffect(() => {
    async function downloadUserInfo(): Promise<SettingsState> {
      const savedRawSettings =
        localStorage.getItem("websiteSettingsThemeMakerSPA") ||
        localStorage.getItem("websiteSettings");
      const loadedSettings = parseStoredSettings(savedRawSettings || "") || {};

      updateSettings(loadedSettings, false);

      return loadedSettings;
    }

    downloadUserInfo().then((preparedSettings) => {});
  }, []);

  return (
    <>
      {!settings.disableWindows && <WindowManager />}
      <PopUpManager />
      {toastComponentMap[settings.notificationStyle]}
      {children}
    </>
  );
}
