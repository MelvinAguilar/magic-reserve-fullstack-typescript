"use client";

import { AuthContext } from "@/context/AuthContext";
import useModalClose from "@/hook/useModalClose";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export function DropdownContainer() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const pathname = usePathname();
  useModalClose(setIsOpen, ".dropdown");
  
  // If the pathname change hide the modal:
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative">
      <button
        type="button"
        className="dropdown f-300 flex size-8 items-center justify-center rounded-full bg-gray-800 text-sm text-white md:mr-0"
        aria-expanded={isOpen}
        aria-controls="user-menu"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="sr-only">Open user menu</span>
        {user?.photo ? (
          <Image
            className="size-8 rounded-full object-cover"
            src={user?.photo || "/user.svg"}
            alt={user?.name || "User profile picture"}
            width={32}
            height={32}
          />
        ) : (
          <p>{user?.name?.charAt(0).toUpperCase()}</p>
        )}
      </button>

      <UserDropdown isOpen={isOpen} />
    </div>
  );
}

interface UserDropdownProps {
  isOpen: boolean;
}

export function UserDropdown({ isOpen }: UserDropdownProps) {
  const { user, logout } = useContext(AuthContext);

  return (
    <div
      className={`dropdown absolute right-0 top-auto z-50 my-4 w-56 divide-y divide-gray-100 rounded-lg bg-white text-base shadow-lg ${
        isOpen ? "block" : "hidden"
      }`}
      id="user-menu"
    >
      <div className="px-4 py-3">
        <span className="block text-sm font-semibold text-gray-900">
          {user?.name}
        </span>
        <span className="block truncate text-sm font-light text-gray-500">
          {user?.email}
        </span>
      </div>
      <ul className="py-1 font-light text-gray-500 " aria-labelledby="dropdown">
        <li>
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            My profile
          </Link>
        </li>
        <li>
          <Link
            href="/profile/edit"
            className="block px-4 py-2 text-sm hover:bg-gray-100"
          >
            Edit profile
          </Link>
        </li>
      </ul>
      <ul className="py-1 font-light text-gray-500" aria-labelledby="dropdown">
        <li>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
          >
            <svg
              className="mr-2 h-5 w-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              ></path>
            </svg>{" "}
            My likes
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
          >
            <svg
              className="mr-2 h-5 w-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
            </svg>{" "}
            Collections
          </a>
        </li>
      </ul>
      <ul className="py-1 font-light text-gray-500" aria-labelledby="dropdown">
        <li>
          <button
            onClick={logout}
            className="w-full px-4 py-2 text-sm hover:bg-gray-100"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
}
