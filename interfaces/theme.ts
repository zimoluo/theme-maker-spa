type ThemeAvailable =
  | "photos"
  | "projects"
  | "home"
  | "blog"
  | "about"
  | "midnight"
  | "glitter"
  | "birthday"
  | "plainLight"
  | "plainDark"
  | "rainbow"
  | "bubbles"
  | "stars"
  | "christmas"
  | "grass"
  | "halloween"
  | "gold"
  | "autumnal"
  | "cherry"
  | "marina"
  | "mori"
  | "sky"
  | "storm";

type ThemePalette =
  | "orange"
  | "teal"
  | "fuchsia"
  | "neutral"
  | "about"
  | "midnight"
  | "cake"
  | "plainLight"
  | "plainDark"
  | "rainbow"
  | "blue"
  | "stars"
  | "christmas"
  | "grass"
  | "halloween"
  | "gold"
  | "autumnal"
  | "cherry"
  | "marina"
  | "mori"
  | "sky"
  | "storm";

type ThemeAnimatedBackground =
  | "photos"
  | "projects"
  | "home"
  | "blog"
  | "midnight"
  | "glitter"
  | "birthday"
  | "rainbow"
  | "bubbles"
  | "stars"
  | "christmas"
  | "grass"
  | "halloween"
  | "about"
  | "gold"
  | "sky"
  | "storm";

type ThemeDisplayFavicon =
  | "photos"
  | "projects"
  | "generic"
  | "blog"
  | "home"
  | "midnight"
  | "glitter"
  | "birthday"
  | "bubbles"
  | "stars"
  | "christmas"
  | "grass"
  | "halloween"
  | "gold"
  | "adaptive"
  | "outline"
  | "sky"
  | "storm";

interface ThemeInterface {
  palette: ThemePalette;
  animatedBackground?: ThemeAnimatedBackground;
  displayFavicon?: ThemeDisplayFavicon;
  siteThemeColor?: HexColor;
}
