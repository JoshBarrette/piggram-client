import { createRootRoute, Outlet } from "@tanstack/react-router";
import "../index.css";
import SideNav from "~/components/nav/side-nav";
import MobileNav from "~/components/nav/mobile-nav";

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
