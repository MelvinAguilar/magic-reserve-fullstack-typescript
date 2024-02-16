"use client";

import CartHeaderContainer from "@/components/cart/CartHeaderContainer";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";
import React, { useContext } from "react";
import { DropdownContainer } from "./UserDropdown";

export function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link href={href} className="text-sm leading-5  transition-all">
        {children}
      </Link>
    </li>
  );
}

export function HighlightNavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="rounded-full border border-primary px-3 py-2 text-sm leading-5 transition-all hover:bg-primary hover:text-white"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Header() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <header className="b-header fixed inset-x-0 top-0 z-50 transition">
        <Link
          href="#main"
          className="absolute left-0 z-[100] m-3 -translate-x-[150%] bg-black p-3 text-white transition focus:translate-x-0"
        >
          Skip to main content
        </Link>
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-8 p-4 lg:px-8">
          <Link href="/" className="text-lg font-bold">
            Magic Reserve
          </Link>
          <nav className="ml-auto" aria-label="Main navigation">
            <ul role="list" className="flex items-center gap-8">
              <NavItem href="#tours">Tours</NavItem>

              <CartHeaderContainer />

              {user ? (
                <DropdownContainer />
              ) : (
                <HighlightNavItem href="/sign-in">Sign In</HighlightNavItem>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}
