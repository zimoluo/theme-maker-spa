"use client";

import { ReactNode, useEffect } from "react";
import { parseStoredSettings, useSettings } from "../contexts/SettingsContext";
import ToastBannerReceiver from "../widgets/ToastBannerReceiver";
import ToastDisplayLegacy from "../widgets/ToastDisplayLegacy";
import PopUpManager from "../widgets/PopUpManager";

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
      const savedRawSettings = localStorage.getItem("websiteSettings");
      const loadedSettings = parseStoredSettings(savedRawSettings || "") || {};

      updateSettings(loadedSettings, false);

      return loadedSettings;
    }

    downloadUserInfo().then((preparedSettings) => {});
  }, []);

  return (
    <>
      {toastComponentMap[settings.notificationStyle]}
      <PopUpManager />
      {children}
    </>
  );
}
