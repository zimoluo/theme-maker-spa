"use client";

import { ReactNode } from "react";
import windowStyle from "./window.module.css";
import { useSettings } from "@/components/contexts/SettingsContext";

interface Props {
  children?: ReactNode;
}

export default function ThemeMakerWindowWrapper({ children }: Props) {
  const { settings } = useSettings();
  const isFullscreen = settings.expandThemeMakerWindow;

  return (
    <div
      className={`${windowStyle.transition} mt-16 ${
        isFullscreen ? "md:mb-6" : "md:my-18 md:rounded-3xl md:shadow-xl"
      } ${
        isFullscreen ? windowStyle.fullscreen : windowStyle.sizing
      } bg-widget-80 md:bg-widget-40 md:backdrop-blur-xl md:overflow-hidden ${
        settings.hideThemeMaker ? "opacity-0" : "opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
