import React from "react";
import Link from "next/link";
import DisplayFavicon from "@/components/assets/DisplayFavicon";
import PhotosIcon from "@/components/assets/navigation/PhotosIcon";
import AboutIcon from "@/components/assets/navigation/AboutIcon";
import BlogIcon from "@/components/assets/navigation/BlogIcon";
import ProjectsIcon from "@/components/assets/navigation/ProjectsIcon";
import ManagementIcon from "@/components/assets/navigation/ManagementIcon";
import MenuNavigationEntryText from "./MenuNavigationEntryText";
import DesignIcon from "@/components/assets/navigation/DesignIcon";

interface Props {
  item: NavigationKey;
}

const navIconMap = {
  home: DisplayFavicon,
  photos: PhotosIcon,
  blog: BlogIcon,
  projects: ProjectsIcon,
  about: AboutIcon,
  management: ManagementIcon,
  design: DesignIcon,
};

export default function MenuEntriesNavigation({ item }: Props) {
  const NavigationIcon = navIconMap[item];

  return (
    <>
      <Link href={`/${item === "home" ? "" : item}`}>
        <div className="group cursor-pointer flex items-center my-4">
          <NavigationIcon
            className={`h-8 md:h-10 w-auto aspect-square transition-transform duration-300 group-hover:scale-110 ${
              item === "home" ? "visible" : ""
            }`}
          />
          <div className="flex-grow" />
          <MenuNavigationEntryText item={item} />
        </div>
      </Link>
      {item !== "design" && (
        <div className="border-primary border-0.4 border-opacity-20" />
      )}
    </>
  );
}
