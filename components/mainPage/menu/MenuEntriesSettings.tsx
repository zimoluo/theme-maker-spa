"use client";

import React, { useMemo } from "react";
import { useSettings } from "@/components/contexts/SettingsContext";
import SettingsFlip from "./settings/SettingsFlip";
import SettingsSlider from "./settings/SettingsSlider";
import menuStyle from "./menu.module.css";
import { useTheme } from "@/components/contexts/ThemeContext";
import SettingsThemePicker from "./settings/SettingsThemePicker";
import NotificationStylePicker from "./settings/NotificationStylePicker";
import ThemeProfileSelector from "@/app/design/theme-maker/ThemeProfileSelector";

const settingsNameMap: { [key in keyof Partial<SettingsState>]: string } = {
  backgroundRichness: "Background richness",
  disableCenterPainting: "Disable center art",
  disableSoundEffect: "Disable sound effect",
  pageTheme: "Theme preset",
  notificationStyle: "Notification style",
  floatingCodeSpeed: "Floating code rate",
  flyingBalloonRate: "Birthday balloon rate",
  goldSphereAnimationIntensity: "Spinning intensity",
  customThemeData: "Theme profile",
  expandThemeMakerWindow: "Expand to fullscreen",
  hideThemeMaker: "Hide Theme Maker",
  optimizeProfileExport: "Optimize profile export",
  allowExtendedGradientStopsRange: "Allow extended gradient",
  enableColorInterpolationMethod: "Enable color interpolation method",
  disableSystemFont: "Disable system font",
  hideColorLookupPanel: "Hide color lookup panel",
};

export default function MenuEntriesSettings() {
  const { settings, updateSettings } = useSettings();
  const { themeConfig } = useTheme();
  const animationKey = themeConfig.animatedBackgroundKey;

  const settingsArray: (keyof Partial<SettingsState>)[] = useMemo(() => {
    let initialSettings: (keyof Partial<SettingsState>)[] = [
      "hideColorLookupPanel",
      "expandThemeMakerWindow",
      "hideThemeMaker",
      "optimizeProfileExport",
      "allowExtendedGradientStopsRange",
      "enableColorInterpolationMethod",
      "disableSystemFont",
    ];

    if (animationKey === "blog") {
      initialSettings = ["disableCenterPainting", ...initialSettings];
    }

    if (animationKey === "halloween") {
      initialSettings = ["disableSoundEffect", ...initialSettings];
    }

    return initialSettings;
  }, [animationKey]);

  return (
    <>
      <div className="md:flex md:items-center gap-2">
        <div className={`text-lg md:text-xl ${menuStyle.entryMinWidth}`}>
          {settingsNameMap["pageTheme"]}
        </div>
        <div className="md:flex-grow my-5 md:my-2">
          <div className="relative bg-light rounded-xl bg-opacity-40 border-0.8 border-opacity-40 border-primary">
            <div className="relative overflow-y-auto py-4 px-4 md:px-2.5 rounded-xl">
              <div className={`${menuStyle.pickerScrollContainer} rounded-xl`}>
                <SettingsThemePicker />
                <div
                  className="h-4 select-none pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </div>
            <div
              className={`absolute bottom-0 left-0 w-full h-full rounded-xl select-none pointer-events-none ${menuStyle.scrollContainerShadow}`}
            />
          </div>
        </div>
      </div>
      <div className="border-primary border-0.4 border-opacity-20" />
      <div className="md:flex md:items-center">
        <div className={`text-lg md:text-xl ${menuStyle.entryMinWidth}`}>
          {settingsNameMap["customThemeData"]}
        </div>
        <div className={`${menuStyle.themeProfileWidth}`}>
          <div className="mt-4 mb-7 md:my-2 px-4">
            <ThemeProfileSelector className="-mb-3" />
          </div>
        </div>
      </div>
      <div className="border-primary border-0.4 border-opacity-20" />
      <div className="md:flex md:items-center">
        <div
          className={`md:flex-grow text-lg md:text-xl ${menuStyle.entryMinWidth}`}
        >
          {settingsNameMap["backgroundRichness"]}
        </div>
        <SettingsSlider
          setValue={(newValue: string | number) => {
            updateSettings({
              backgroundRichness: newValue as "minimal" | "reduced" | "rich",
            });
          }}
          values={["minimal", "reduced", "rich"]}
          text={["Minimal", "Reduced", "Rich"]}
          entry={settings.backgroundRichness}
        />
      </div>
      <div className="border-primary border-0.4 border-opacity-20" />
      <div className="md:flex md:items-center">
        <div
          className={`md:flex-grow text-lg md:text-xl ${menuStyle.entryMinWidth} mb-4 md:mb-0`}
        >
          {settingsNameMap["notificationStyle"]}
        </div>
        <NotificationStylePicker />
      </div>
      <div className="border-primary border-0.4 border-opacity-20" />
      {animationKey === "projects" && (
        <>
          <div className="md:flex md:items-center">
            <div
              className={`md:flex-grow text-lg md:text-xl ${
                menuStyle.entryMinWidth
              } ${
                settings.floatingCodeSpeed < 1000
                  ? "flex md:block items-center"
                  : ""
              }`}
            >
              {settingsNameMap["floatingCodeSpeed"]}
              {settings.floatingCodeSpeed < 1000 && (
                <div className="text-xs ml-1 md:ml-0">
                  (Performance warning)
                </div>
              )}
            </div>
            <SettingsSlider
              setValue={(newValue: number | string) => {
                updateSettings({
                  floatingCodeSpeed: newValue as number,
                });
              }}
              values={[6000, 2800, 1800, 800, 40]}
              text={["*yawn*", "Slack", "Normal", "Hustle", "*yeet*"]}
              entry={settings.floatingCodeSpeed}
            />
          </div>
          <div className="border-primary border-0.4 border-opacity-20" />
        </>
      )}
      {animationKey === "birthday" && (
        <>
          <div className="md:flex md:items-center">
            <div
              className={`md:flex-grow text-lg md:text-xl ${
                menuStyle.entryMinWidth
              } ${
                settings.flyingBalloonRate < 1000
                  ? "flex md:block items-center"
                  : ""
              }`}
            >
              {settingsNameMap["flyingBalloonRate"]}
              {settings.flyingBalloonRate < 1000 && (
                <div className="text-xs ml-1 md:ml-0">
                  (Performance warning)
                </div>
              )}
            </div>
            <SettingsSlider
              setValue={(newValue: number | string) => {
                updateSettings({
                  flyingBalloonRate: newValue as number,
                });
              }}
              values={[3000, 1600, 500, 50]}
              text={["Steady", "Normal", "Rave", "*yeet*"]}
              entry={settings.flyingBalloonRate}
            />
          </div>
          <div className="border-primary border-0.4 border-opacity-20" />
        </>
      )}
      {animationKey === "gold" && (
        <>
          <div className="md:flex md:items-center">
            <div
              className={`md:flex-grow text-lg md:text-xl ${menuStyle.entryMinWidth}`}
            >
              {settingsNameMap["goldSphereAnimationIntensity"]}
            </div>
            <SettingsSlider
              setValue={(newValue: string | number) => {
                updateSettings({
                  goldSphereAnimationIntensity: newValue as number,
                });
              }}
              values={[20, 60, 100, 150, 800]}
              text={["Gentle", "Steady", "Dynamic", "Vibrant", "Blazing"]}
              entry={settings.goldSphereAnimationIntensity}
            />
          </div>
          <div className="border-primary border-0.4 border-opacity-20" />
        </>
      )}
      {settingsArray.map((item, index, array) => (
        <React.Fragment key={item}>
          <div className="flex items-center gap-2">
            <div className="flex-grow text-lg md:text-xl ml-1">
              {settingsNameMap[item as keyof SettingsState]}
            </div>
            <SettingsFlip
              key={item}
              onClick={(status: boolean) => {
                updateSettings({
                  [item]: status,
                } as Partial<SettingsState>);
              }}
              state={
                (settings as unknown as Record<string, unknown>)[
                  item
                ] as boolean
              }
            />
          </div>
          {index !== array.length - 1 && (
            <div className="border-primary border-0.4 border-opacity-20" />
          )}
        </React.Fragment>
      ))}
    </>
  );
}
