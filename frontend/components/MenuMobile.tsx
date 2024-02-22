"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

interface MenuProps {
  toggleMenu: () => void;
  isMenuOpen: boolean;
}

const MenuMobile: React.FC<MenuProps> = ({ toggleMenu, isMenuOpen }) => {
  const pathname = usePathname();

  useEffect(() => {
    if (isMenuOpen) {
      toggleMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <button
      type="button"
      onClick={toggleMenu}
      className="z-50 flex h-[1.15rem] w-7 flex-col justify-between md:hidden"
      aria-label="Navigation menu"
      aria-expanded={isMenuOpen}
      aria-controls="navbar-menu"
    >
      <span
        className="bar1 | z-10 h-0.5 w-7 transform bg-primary transition-all"
        aria-hidden="true"
      ></span>
      <span
        className="bar2 | z-10 h-0.5 w-7 bg-primary transition-all"
        aria-hidden="true"
      ></span>
      <span
        className="bar3 | z-10 h-0.5 w-7 transform bg-primary transition-all"
        aria-hidden="true"
      ></span>
    </button>
  );
};

export default MenuMobile;