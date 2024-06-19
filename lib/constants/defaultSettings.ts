import cubisticConfig from "@/components/theme/config/cubistic";
import energizeConfig from "@/components/theme/config/energize";
import lollipopConfig from "@/components/theme/config/lollipop";
import oasisConfig from "@/components/theme/config/oasis";
import penumbraConfig from "@/components/theme/config/penumbra";
import skyConfig from "@/components/theme/config/sky";
import springFieldConfig from "@/components/theme/config/springField";
import vitreousConfig from "@/components/theme/config/vitreous";

const themeMakerDefaultTheme: ThemeKey = "penumbra";

export const defaultSettings: SettingsState = {
  backgroundRichness: "rich",
  floatingCodeSpeed: 1800,
  disableCenterPainting: false,
  disableSoundEffect: false,
  pageTheme: {
    themeMaker: themeMakerDefaultTheme,
  },
  notificationStyle: "banner",
  flyingBalloonRate: 1600,
  goldSphereAnimationIntensity: 100,
  customThemeData: [
    lollipopConfig,
    cubisticConfig,
    energizeConfig,
    oasisConfig,
    springFieldConfig,
    vitreousConfig,
    penumbraConfig,
    skyConfig,
  ],
  customThemeIndex: 0,
  regularThemeMakerTheme: themeMakerDefaultTheme,
  expandThemeMakerWindow: false,
  hideThemeMaker: false,
  optimizeProfileExport: false,
  allowExtendedGradientStopsRange: false,
  enableColorInterpolationMethod: false,
};
