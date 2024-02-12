"use client";

import { Container } from "@/components/Container";
import { NavItem } from "./Header";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <Container className="py-14">
        <nav className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
            <NavItem href="#tours">Tours</NavItem>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
