"use client";

import { useNavigation } from "@/lib/helperHooks";
import themePickerStyle from "./settings-theme-picker.module.css";
import { useSettings } from "@/components/contexts/SettingsContext";
import Image from "next/image";
import { allListedThemes } from "@/components/theme/util/listedThemesMap";

interface Props {
  theme: ThemeKey | "random";
}

export default function ThemePickerButton({ theme }: Props) {
  const currentPage = useNavigation();

  const { settings, updatePageTheme } = useSettings();

  const handleThemeChange = () => {
    if (theme === "random") {
      const currentTheme = settings.pageTheme[currentPage];

      const filteredThemes = allListedThemes.filter(
        (theme) => theme !== currentTheme
      );

      if (!(filteredThemes.length > 0)) {
        return;
      }

      const randomIndex = Math.floor(Math.random() * filteredThemes.length);
      const randomTheme = filteredThemes[randomIndex];
      updatePageTheme(randomTheme, currentPage);
    } else {
      updatePageTheme(theme, currentPage);
    }
  };

  return (
    <button
      key={theme}
      className={`${themePickerStyle.ring} transition-colors duration-300 ease-in-out relative rounded-full group`}
      onClick={handleThemeChange}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          themePickerStyle.selected
        } transition-all duration-300 ease-in-out rounded-full w-0 h-0 select-none pointer-events-none ${
          settings.pageTheme[currentPage] === theme
            ? "opacity-100"
            : "opacity-0 group-hover:opacity-100"
        }`}
        aria-hidden="true"
      />
      <Image
        src={`./theme/picker/${theme}.svg`}
        alt={`Use ${theme} theme`}
        height={40}
        width={40}
        className="h-auto aspect-square w-12 md:w-14 rounded-full relative"
        draggable="false"
        priority={true}
      />
    </button>
  );
}
