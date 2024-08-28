"use client";

import { ReactNode, useState, useRef } from "react";
import SettingsPanelIcon from "../assets/navigation/SettingsPanelIcon";
import MenuSlideWrapper from "./menu/MenuSlideWrapper";
import navbarStyle from "./navbar.module.css";

interface Props {
  menuContent?: ReactNode;
}

export default function NavbarWrapper({ menuContent }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const openMenu = () => {
    setMenuOpen(true);
  };

  const restoreNavbar = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <MenuSlideWrapper
        onClose={restoreNavbar}
        isOpen={menuOpen}
        menuButtonRef={menuButtonRef}
      >
        {menuContent}
      </MenuSlideWrapper>
      <button
        className="fixed top-3 right-4 h-6 w-auto aspect-square hover:scale-110 transition-transform duration-300 z-40 ease-out"
        onClick={menuOpen ? restoreNavbar : openMenu}
        ref={menuButtonRef}
      >
        <div
          className={`absolute pointer-events-none ${
            menuOpen
              ? navbarStyle.menuButtonTranslationOpen
              : navbarStyle.menuButtonTranslationClosedUpper
          } ${navbarStyle.menuButton}`}
        >
          <SettingsPanelIcon
            className={`h-6 w-auto ${
              menuOpen
                ? navbarStyle.menuButtonRotationOpenUpper
                : navbarStyle.menuButtonRotationClosed
            } aspect-square ${navbarStyle.menuButton}`}
          />
        </div>
        <div
          className={`absolute pointer-events-none ${
            menuOpen
              ? navbarStyle.menuButtonTranslationOpen
              : navbarStyle.menuButtonTranslationClosedLower
          } ${navbarStyle.menuButton}`}
        >
          <SettingsPanelIcon
            className={`h-6 w-auto ${
              menuOpen
                ? navbarStyle.menuButtonRotationOpenLower
                : navbarStyle.menuButtonRotationClosed
            } aspect-square ${navbarStyle.menuButton}`}
          />
        </div>
      </button>
    </>
  );
}
