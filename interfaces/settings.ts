interface SettingsState {
  backgroundRichness: "minimal" | "reduced" | "rich";
  syncSettings: boolean;
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
}

type NotificationStyle = "disabled" | "toast" | "banner";
