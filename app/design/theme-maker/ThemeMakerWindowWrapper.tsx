"use client";

import { ReactNode, useEffect, useState } from "react";
import windowStyle from "./window.module.css";
import { useSettings } from "@/components/contexts/SettingsContext";

interface Props {
  children?: ReactNode;
}

export default function ThemeMakerWindowWrapper({ children }: Props) {
  const { settings } = useSettings();
  const [isInterpolating, setIsInterpolating] = useState(false);
  const [fullScreenBuffer, setFullScreenBuffer] = useState(false);

  const isFullscreen = settings.expandThemeMakerWindow;

  useEffect(() => {
    setIsInterpolating(true);
    setFullScreenBuffer(isFullscreen);
    setTimeout(() => {
      setIsInterpolating(false);
    }, 300);
  }, [isFullscreen]);

  return (
    <div
      className={`${
        isInterpolating
          ? windowStyle.transition
          : "transition-opacity duration-300 ease-out"
      } mt-12 ${
        fullScreenBuffer ? "" : "md:my-16 md:rounded-3xl md:shadow-xl"
      } ${
        fullScreenBuffer ? windowStyle.fullscreen : windowStyle.sizing
      } bg-widget-80 md:bg-widget-60 md:backdrop-blur-2xl md:overflow-hidden ${
        settings.hideThemeMaker
          ? "opacity-0 pointer-events-none select-none"
          : "opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
