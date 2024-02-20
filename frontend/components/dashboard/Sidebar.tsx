"use client"

import Link from "next/link";
import { IconHome, IconReservation, IconTour, IconUser } from "../Icons";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: IconHome, current: true },
  { name: "Tours", href: "/tours/list", icon: IconTour, current: false },
  { name: "User", href: "/users", icon: IconUser, current: false },
  { name: "Reservations", href: "/reservations/list", icon: IconReservation, current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function SideBar() {
  const pathname = usePathname();

  const checkCurrent = (href: string) => {
    return pathname.toLowerCase() === href.toLowerCase();
  };

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pt-20">
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={classNames(
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6",
                      checkCurrent(item.href)
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600",
                    )}
                  >
                    <item.icon
                      className={classNames(
                        "h-6 w-6 shrink-0",
                        checkCurrent(item.href)
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                      )}
                      aria-hidden="true"
                    />
                    <p className="hidden sm:block pr-8">
                      {item.name}
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  );
}
