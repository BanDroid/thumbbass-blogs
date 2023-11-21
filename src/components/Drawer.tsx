import { ReactNode } from "react";
import SvgIcons from "@/utils/icons";
import Logo from "./Logo";
import MenuItem from "./MenuItem";

export const DRAWER_ID = "navigation-drawer";

interface DrawerProps {
  children: ReactNode;
}
export default function Drawer({ children }: DrawerProps) {
  return (
    <div className="drawer min-h-screen">
      <input
        id={DRAWER_ID}
        type="checkbox"
        defaultChecked={false}
        className="drawer-toggle"
      />
      <div className="drawer-content">
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side z-50">
        <label htmlFor={DRAWER_ID} className="drawer-overlay"></label>
        <ul
          style={{ display: "none" }}
          className="!flex menu p-4 w-80 h-full bg-base-100 text-base-content"
        >
          {/* Sidebar content here */}
          <div className="pb-2 mb-2 flex flex-row items-center justify-between border-b-2 border-base-300">
            <Logo />
            <label
              htmlFor={DRAWER_ID}
              className="btn btn-ghost btn-circle md-ripples ripples-dark ml-auto"
            >
              <SvgIcons name="clear_or_close" className="!w-6 !h-6" />
            </label>
          </div>
          <MenuItem />
        </ul>
      </div>
    </div>
  );
}
