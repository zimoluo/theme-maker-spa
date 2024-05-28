"use client";

import { ReactNode, useState } from "react";
import SettingsPanelIcon from "../assets/navigation/SettingsPanelIcon";
import MenuSlideWrapper from "./menu/MenuSlideWrapper";

interface Props {
  menuContent?: ReactNode;
}

export default function NavbarWrapper({ menuContent }: Props) {
  const [navbarExpanded, setNavbarExpanded] = useState(true);

  const [menuOpen, setMenuOpen] = useState(false);
  const [menuButtonRotation, setMenuButtonRotation] = useState(false);
  const [menuButtonTranslation, setMenuButtonTranslation] = useState(false);

  const openMenu = () => {
    setNavbarExpanded(true);
    setMenuOpen(true);

    setMenuButtonTranslation(true);
    setTimeout(() => {
      setMenuButtonRotation(true);
    }, 100);
  };

  const restoreNavbar = () => {
    setNavbarExpanded(true);
    setMenuOpen(false);

    setMenuButtonRotation(false);
    setTimeout(() => {
      setMenuButtonTranslation(false);
    }, 100);
  };

  return (
    <>
      <MenuSlideWrapper onClose={restoreNavbar} isOpen={menuOpen}>
        {menuContent}
      </MenuSlideWrapper>
      <button
        className={`fixed top-3 right-4 h-6 w-auto aspect-square hover:scale-110 transition-transform duration-300 z-40 ease-out ${
          navbarExpanded || menuOpen ? "" : `-translate-y-14`
        } `}
        onClick={menuOpen ? restoreNavbar : openMenu}
        id="menu-button"
      >
        <SettingsPanelIcon
          className={`absolute h-6 w-auto ${
            menuButtonTranslation ? "-translate-y-1/2" : "-translate-y-1/3"
          } ${
            menuButtonRotation ? "-rotate-45" : ""
          } pointer-events-none aspect-square transition-all duration-150`}
        />
        <SettingsPanelIcon
          className={`absolute h-6 w-auto ${
            menuButtonTranslation ? "-translate-y-1/2" : "-translate-y-2/3"
          } ${
            menuButtonRotation ? "rotate-45" : ""
          } pointer-events-none aspect-square transition-all duration-150`}
        />
      </button>
    </>
  );
}
