interface SettingsState {
  backgroundRichness: "minimal" | "reduced" | "rich";
  floatingCodeSpeed: number;
  disableCenterPainting: boolean;
  disableSoundEffect: boolean;
  pageTheme: Record<NavigationKey, ThemeKey>;
  notificationStyle: NotificationStyle;
  flyingBalloonRate: number;
  goldSphereAnimationIntensity: number;
  customThemeData: ThemeDataConfig[];
  customThemeIndex: number;
  regularThemeMakerTheme: ThemeKey;
  expandThemeMakerWindow: boolean;
  hideThemeMaker: boolean;
  optimizeProfileExport: boolean;
}

type NotificationStyle = "disabled" | "toast" | "banner";
