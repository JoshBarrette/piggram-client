import { ReactNode } from "react";
import { NavIconButton, NavIconButtonLink } from "./ui/nav-button";
import { Home, PiggyBank, PlusSquare, Search, Settings } from "lucide-react";
import useUser from "~/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link } from "@tanstack/react-router";

export default function MobileNav(props: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <TopNav />
      {props.children}
      <BottomNav />
    </div>
  );
}

function BottomNav() {
  const { user } = useUser();

  return (
    <div className="flex w-full items-center justify-between border-t border-neutral-700 px-20 py-1 md:hidden">
      <NavIconButtonLink to="/">
        <Home className="size-6" />
      </NavIconButtonLink>

      <NavIconButtonLink to="about">
        <Search className="size-6" />
      </NavIconButtonLink>

      <NavIconButton>
        <PlusSquare className="size-6" />
      </NavIconButton>

      <NavIconButtonLink
        to={`/profile/${user?.userId}`}
        className="hover:bg-transparent"
      >
        <Avatar className="my-auto mr-1 size-8">
          <AvatarImage src={user?.picture} alt={user?.firstName} />
          <AvatarFallback>PFP</AvatarFallback>
        </Avatar>
      </NavIconButtonLink>
    </div>
  );
}

function TopNav() {
  return (
    <div className="flex w-full items-center border-b border-neutral-700 px-3 py-2 md:hidden">
      <div className="flex flex-grow items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
          <PiggyBank className="my-auto size-10" />
          <h1 className="text-3xl font-bold">Piggram</h1>
        </Link>
      </div>

      <NavIconButton>
        <Settings className="size-6" />
      </NavIconButton>
    </div>
  );
}
