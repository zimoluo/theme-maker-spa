import { ReactNode } from "react";
import PhotosAnimatedBackground from "../mainPage/backgroundAnimations/photos/PhotosAnimatedBackground";
import HomeAnimatedBackground from "../mainPage/backgroundAnimations/home/HomeAnimatedBackground";
import BlogAnimatedBackground from "../mainPage/backgroundAnimations/blog/BlogAnimatedBackground";
import ProjectsAnimatedBackground from "../mainPage/backgroundAnimations/projects/ProjectsAnimatedBackground";

export const backgroundAnimationMap: Record<
  ThemeAnimatedBackground,
  ReactNode
> = {
  photos: <PhotosAnimatedBackground />,
  projects: <ProjectsAnimatedBackground />,
  about: undefined,
  home: <HomeAnimatedBackground />,
  blog: <BlogAnimatedBackground />,
};