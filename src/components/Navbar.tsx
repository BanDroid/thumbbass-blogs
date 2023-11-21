"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SvgIcons from "@/utils/icons";
import { menuItems } from "@/utils/navbarMenu";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { DRAWER_ID } from "./Drawer";

export { Navbar };

function Navbar() {
  const [collapseSearchBar, setCollapseSearchBar] = useState(false);
  return (
    <div
      className={`sticky top-0 bg-base-100 border-b-[1px] border-base-200 max-h-auto z-30 ${
        collapseSearchBar && "pb-2"
      }`}
    >
      <nav className="flex items-center justify-between px-4 py-1 max-w-7xl mx-auto">
        <div className="flex items-center justify-start">
          <label
            htmlFor={DRAWER_ID}
            className="btn btn-ghost btn-circle md-ripples ripples-dark inline-flex md:hidden"
          >
            <SvgIcons name="bars_3" className="!w-6 !h-6" />
          </label>

          <Logo />
        </div>
        <div className="">
          <NavbarCenter />
        </div>
        <div className="flex items-center justify-end">
          {/* change theme button */}
          <button className="btn btn-ghost btn-circle md-ripples ripples-dark">
            <SvgIcons name="swatch" className="!w-6 !h-6" />
          </button>
          {/* change open searchbar button */}
          <button
            className="btn btn-ghost btn-circle md-ripples ripples-dark"
            onClick={() => setCollapseSearchBar(!collapseSearchBar)}
          >
            {collapseSearchBar ? (
              <SvgIcons name="arrow_up" className="!w-6 !h-6" />
            ) : (
              <SvgIcons name="search" className="!w-6 !h-6" />
            )}
          </button>
        </div>
      </nav>

      {collapseSearchBar && <SearchBar />}
    </div>
  );
}

function SearchBar() {
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/blogs?search=${value}`);
  };
  return (
    <form
      onSubmit={handleSearch}
      className={`bg-base-200 rounded overflow-hidden flex flex-row items-center gap-2 w-[90%] !max-w-lg mx-auto
			${isFocus ? "bg-opacity-100" : "bg-opacity-70"}
		`}
    >
      <input
        className="border-none outline-none bg-transparent min-w-0 w-full flex-1 px-4 py-2 pr-0"
        type="text"
        name="search"
        placeholder="Search"
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="reset"
        className={`btn btn-xs btn-ghost btn-circle no-animation md-ripples ripples-dark ${
          value
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setValue("")}
      >
        <SvgIcons name="clear_or_close" className="!w-6 !h-6" />
      </button>
      <button
        type="submit"
        className="btn btn-sm btn-primary no-animation h-auto p-2 rounded-none md-ripples ripples-dark rounded-tr rounded-br"
      >
        <SvgIcons name="search" className="!w-6 !h-6" />
      </button>
    </form>
  );
}

function NavbarCenter() {
  const pathname = usePathname();
  return (
    <div className="tabs hidden md:flex">
      {menuItems.map(({ id, title, icon, href }) => (
        <Link
          key={id}
          className={`tab ${
            href === pathname ? "tab-active" : ""
          } items-center gap-2`}
          href={href}
        >
          {icon ? <SvgIcons name={icon} className="!w-6 !h-6" /> : null}
          {title}
        </Link>
      ))}
    </div>
  );
}
