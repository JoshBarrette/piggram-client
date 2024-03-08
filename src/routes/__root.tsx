import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../index.css";
import SideNav from "~/components/SideNav";
import MobileNav from "~/components/MobileNav";

export const Route = createRootRoute({
  component: () => (
    <div className="flex h-screen flex-col sm:flex-row">
      <SideNav />
      <MobileNav>
        <Outlet />
      </MobileNav>
    </div>
  ),
});
