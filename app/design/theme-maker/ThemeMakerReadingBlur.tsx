"use client";

import { useSettings } from "@/components/contexts/SettingsContext";
import ReadingBlur from "@/components/widgets/ReadingBlur";

export default function ThemeMakerReadingBlur() {
  const { settings } = useSettings();

  return !settings.hideThemeMaker && <ReadingBlur className="md:hidden" />;
}
