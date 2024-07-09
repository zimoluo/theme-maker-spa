import aboutConfig from "../config/about";
import autumnalConfig from "../config/autumnal";
import bewitchedConfig from "../config/bewitched";
import birthdayConfig from "../config/birthday";
import blogConfig from "../config/blog";
import bubblesConfig from "../config/bubbles";
import cherryConfig from "../config/cherry";
import christmasConfig from "../config/christmas";
import crimsonConfig from "../config/crimson";
import eepConfig from "../config/eep";
import glitterConfig from "../config/glitter";
import goldConfig from "../config/gold";
import grassConfig from "../config/grass";
import halloweenConfig from "../config/halloween";
import homeConfig from "../config/home";
import marinaConfig from "../config/marina";
import midnightConfig from "../config/midnight";
import moriConfig from "../config/mori";
import oasisConfig from "../config/oasis";
import penumbraConfig from "../config/penumbra";
import photosConfig from "../config/photos";
import pixellandConfig from "../config/pixelland";
import plainDarkConfig from "../config/plainDark";
import plainLightConfig from "../config/plainLight";
import projectsConfig from "../config/projects";
import rainbowConfig from "../config/rainbow";
import scintillatingConfig from "../config/scintillating";
import skyConfig from "../config/sky";
import spookfestConfig from "../config/spookfest";
import starsConfig from "../config/stars";
import stormConfig from "../config/storm";
import underwaterConfig from "../config/underwater";
import verdantConfig from "../config/verdant";
import vitreousConfig from "../config/vitreous";

export const themeKeyMap: Record<ThemeKey, ThemeDataConfig> = {
  photos: photosConfig,
  projects: projectsConfig,
  home: homeConfig,
  about: aboutConfig,
  blog: blogConfig,
  midnight: midnightConfig,
  glitter: glitterConfig,
  birthday: birthdayConfig,
  plainLight: plainLightConfig,
  plainDark: plainDarkConfig,
  rainbow: rainbowConfig,
  bubbles: bubblesConfig,
  stars: starsConfig,
  christmas: christmasConfig,
  grass: grassConfig,
  halloween: halloweenConfig,
  gold: goldConfig,
  autumnal: autumnalConfig,
  cherry: cherryConfig,
  marina: marinaConfig,
  mori: moriConfig,
  sky: skyConfig,
  storm: stormConfig,
  vitreous: vitreousConfig,
  pixelland: pixellandConfig,
  scintillating: scintillatingConfig,
  verdant: verdantConfig,
  custom: oasisConfig,
  penumbra: penumbraConfig,
  bewitched: bewitchedConfig,
  spookfest: spookfestConfig,
  underwater: underwaterConfig,
  crimson: crimsonConfig,
  eep: eepConfig,
};
