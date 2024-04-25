"use client";

import CrossIcon from "@/components/assets/CrossIcon";
import { useSettings } from "@/components/contexts/SettingsContext";
import { useEffect, useState } from "react";
import selectorStyle from "./profile-selector.module.css";
import blankConfig from "@/components/themeUtil/customPalettePreset/blank";

interface Props {
  index: number;
  startingDimension?: number;
}

export default function ProfileSelectorButton({
  index,
  startingDimension = 4,
}: Props) {
  const [dimension, setDimension] = useState(startingDimension);

  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    setDimension(4);
  }, []);

  const safelyChangeIndex = () => {
    if (index < 0 || index > settings.customThemeData.length - 1) {
      return;
    }
    updateSettings({ customThemeIndex: index });
  };

  const removeThisProfile = () => {
    if (settings.customThemeData.length <= 1) {
      updateSettings({ customThemeData: [blankConfig], customThemeIndex: 0 });
      return;
    }

    let newIndex = settings.customThemeIndex;
    if (settings.customThemeIndex >= index) {
      newIndex--;
    }

    updateSettings({
      customThemeData: [
        ...settings.customThemeData.slice(0, index),
        ...settings.customThemeData.slice(index + 1),
      ],
      customThemeIndex: newIndex,
    });
  };

  return (
    <div className="relative group">
      <div
        className={`absolute rounded-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
          selectorStyle.selected
        } transition-opacity duration-300 ease-out ${
          index === settings.customThemeIndex ? "opacity-100" : "opacity-0"
        }`}
      />
      <button
        style={{ width: `${dimension}rem`, transition: "width 300ms ease-out" }}
        className="rounded-xl bg-page h-16 shadow-lg border-2 border-saturated relative"
        onClick={safelyChangeIndex}
      />
      <button
        onClick={removeThisProfile}
        className="absolute top-2 left-2 transition-opacity duration-150 ease-out opacity-0 group-hover:opacity-100"
      >
        <CrossIcon
          isSaturated={true}
          className={`opacity-90 h-auto aspect-square ${selectorStyle.cross}`}
        />
      </button>
    </div>
  );
}
