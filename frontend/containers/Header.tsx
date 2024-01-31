"use client";

import Link from "next/link";

export function NavItem({
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
        className="text-sm leading-5 border-hover-colored  transition-all"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Header() {
  return (
    <header
      className="z-50 b-header fixed inset-x-0 top-0 transition"
    >
      <Link
        href="#main"
        className="bg-black absolute left-0 z-[100] m-3 -translate-x-[150%] p-3 text-white transition focus:translate-x-0"
      >
        Skip to main content
      </Link>
      <div className="w-full mx-auto max-w-7xl p-4 lg:px-8 flex items-center justify-between gap-8">
        <Link
          href="/"
          className="text-lg font-bold"
        >
          Magic Reserve
        </Link>
        <nav className="ml-auto" aria-label="Main navigation">
          <ul role="list" className="flex items-center gap-8">
            <NavItem href="#tours">Tours</NavItem>
          </ul>
        </nav>
      </div>
    </header>
  );
}