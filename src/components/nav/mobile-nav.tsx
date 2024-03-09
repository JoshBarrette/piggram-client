import { ReactNode } from "react";
import { NavIconButton, NavIconButtonLink } from "../ui/nav-button";
import { Home, LogIn, PiggyBank, PlusSquare, Search } from "lucide-react";
import useUser from "~/hooks/useUser";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Link } from "@tanstack/react-router";
import SettingsButton from "./settings-button";

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
  return (
    <div className="flex w-full items-center justify-between border-t border-neutral-700 px-20 py-1 md:hidden">
      <NavIconButtonLink to="/" className="group">
        <Home className="size-6 transition-all group-hover:scale-125" />
      </NavIconButtonLink>

      <NavIconButtonLink to="about" className="group">
        <Search className="size-6 transition-all group-hover:scale-125" />
      </NavIconButtonLink>

      <NavIconButtonLink to="upload" className="group">
        <PlusSquare className="size-6 transition-all group-hover:scale-125" />
      </NavIconButtonLink>

      <MobileUserButton />
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

      <SettingsButton />
    </div>
  );
}

function MobileUserButton() {
  const { user, isSignedIn } = useUser();

  return (
    <>
      {isSignedIn ? (
        <NavIconButtonLink to={`/profile/${user?.userId}`} className="group">
          <Avatar className="size-7 transform transition-all group-hover:scale-125">
            <AvatarImage src={user?.picture} alt={user?.firstName} />
            <AvatarFallback>PFP</AvatarFallback>
          </Avatar>
        </NavIconButtonLink>
      ) : (
        <a href={`${import.meta.env.VITE_APP_API_URL}/auth/google/login`}>
          <NavIconButton className="group">
            <LogIn className="size-6 transition-all group-hover:scale-125" />
          </NavIconButton>
        </a>
      )}
    </>
  );
}
