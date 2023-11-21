"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "@/utils/navbarMenu";
import { DRAWER_ID } from "./Drawer";
import SvgIcons from "@/utils/icons";

export default function MenuItem() {
  const pathname = usePathname();
  return (
    <>
      {menuItems.map(({ id, title, icon, href }) => (
        <li
          key={id}
          className="w-full mb-2 rounded-md overflow-hidden md-ripples ripples-dark"
          onClick={() => {
            const checkbox = document.querySelector(
              `#${DRAWER_ID}`
            ) as HTMLInputElement;
            checkbox.checked = !checkbox.checked;
          }}
        >
          <Link
            href={href}
            className={`block w-full h-fit p-0
              flex flex-row items-center justify-start px-4 py-2
              ${href === pathname ? "!bg-primary text-white" : ""}
              md-ripples ripples-dark
            `}
          >
            <SvgIcons name={icon || ""} className="!w-6 !h-6 mr-2" />
            {title}
          </Link>
        </li>
      ))}
    </>
  );
}
