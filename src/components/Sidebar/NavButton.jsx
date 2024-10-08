"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavButton({ children, href }) {
  const pathname = usePathname();
  const active = pathname.includes(href);
  return (
    <Link
      href={href}
      className={`font-bold py-2 text-right px-2 rounded transition ease-in-out ${
        active
          ? "bg-red-500 text-white"
          : "hover:bg-red-100 active:bg-red-500 active:text-white"
      }`}
    >
      {children}
    </Link>
  );
}
