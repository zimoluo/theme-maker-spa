import { ReactNode } from "react";
import PhotosAnimatedBackground from "../mainPage/backgroundAnimations/photos/PhotosAnimatedBackground";
import HomeAnimatedBackground from "../mainPage/backgroundAnimations/home/HomeAnimatedBackground";
import BlogAnimatedBackground from "../mainPage/backgroundAnimations/blog/BlogAnimatedBackground";
import ProjectsAnimatedBackground from "../mainPage/backgroundAnimations/projects/ProjectsAnimatedBackground";
import MidnightAnimatedBackground from "../mainPage/backgroundAnimations/midnight/MidnightAnimatedBackground";
import GlitterAnimatedBackground from "../mainPage/backgroundAnimations/glitter/GlitterAnimatedBackground";
import BirthdayAnimatedBackground from "../mainPage/backgroundAnimations/birthday/BirthdayAnimatedBackground";
import RainbowScroll from "../mainPage/backgroundAnimations/rainbow/RainbowScroll";
import BubblesAnimatedBackground from "../mainPage/backgroundAnimations/bubbles/BubblesAnimatedBackground";
import ShootingStars from "../mainPage/backgroundAnimations/star/ShootingStars";
import ChristmasAnimatedBackground from "../mainPage/backgroundAnimations/christmas/ChristmasAnimatedBackground";
import GrassAnimatedBackground from "../mainPage/backgroundAnimations/grass/GrassAnimatedBackground";
import HalloweenAnimatedBackground from "../mainPage/backgroundAnimations/halloween/HalloweenAnimatedBackground";
import AboutAnimatedBackground from "../mainPage/backgroundAnimations/about/AboutAnimatedBackground";
import GoldAnimatedBackground from "../mainPage/backgroundAnimations/gold/GoldAnimatedBackground";
import SkyAnimatedBackground from "../mainPage/backgroundAnimations/sky/SkyAnimatedBackground";
import StormAnimatedBackground from "../mainPage/backgroundAnimations/storm/StormAnimatedBackground";
import PixellandAnimatedBackground from "../mainPage/backgroundAnimations/pixelland/PixellandAnimatedBackground";
import VerdantAnimatedBackground from "../mainPage/backgroundAnimations/verdant/VerdantAnimatedBackground";
import BewitchedAnimatedBackground from "../mainPage/backgroundAnimations/bewitched/BewitchedAnimatedBackground";
import UnderwaterAnimatedBackground from "../mainPage/backgroundAnimations/underwater/UnderwaterAnimatedBackground";

export const backgroundAnimationMap: Record<
  ThemeAnimatedBackgroundKey,
  ReactNode
> = {
  photos: <PhotosAnimatedBackground />,
  projects: <ProjectsAnimatedBackground />,
  home: <HomeAnimatedBackground />,
  blog: <BlogAnimatedBackground />,
  midnight: <MidnightAnimatedBackground />,
  glitter: <GlitterAnimatedBackground />,
  birthday: <BirthdayAnimatedBackground />,
  rainbow: <RainbowScroll />,
  bubbles: <BubblesAnimatedBackground />,
  stars: <ShootingStars />,
  christmas: <ChristmasAnimatedBackground />,
  grass: <GrassAnimatedBackground />,
  halloween: <HalloweenAnimatedBackground />,
  about: <AboutAnimatedBackground />,
  gold: <GoldAnimatedBackground />,
  sky: <SkyAnimatedBackground />,
  storm: <StormAnimatedBackground />,
  pixelland: <PixellandAnimatedBackground />,
  verdant: <VerdantAnimatedBackground />,
  bewitched: <BewitchedAnimatedBackground />,
  underwater: <UnderwaterAnimatedBackground />,
};
