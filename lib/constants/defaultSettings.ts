import cherryConfig from "@/components/theme/config/cherry";
import cubisticConfig from "@/components/theme/config/cubistic";
import lollipopConfig from "@/components/theme/config/lollipop";
import moriConfig from "@/components/theme/config/mori";
import oasisConfig from "@/components/theme/config/oasis";
import scintillatingConfig from "@/components/theme/config/scintillating";
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
    oasisConfig,
    springFieldConfig,
    vitreousConfig,
    scintillatingConfig,
    cherryConfig,
    moriConfig,
    skyConfig,
  ],
  customThemeIndex: 0,
  regularThemeMakerTheme: themeMakerDefaultTheme,
  expandThemeMakerWindow: false,
  hideThemeMaker: false,
};
