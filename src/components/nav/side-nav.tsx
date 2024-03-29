import { Link } from "@tanstack/react-router";
import useUser from "../../hooks/useUser";
import { ThemeToggle } from "../theme/theme-toggle";
import { NavButton, NavButtonLink } from "./nav-button";
import UserDropdown from "./user-dropdown";
import { Home, Search, PlusSquare, LogIn, PiggyBank } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function SideNav() {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="z-10 hidden h-screen flex-col items-center border-r border-neutral-700 px-2 py-10 md:flex xl:w-72">
      <Link to="/" className="flex space-x-2 xl:w-full">
        <PiggyBank className="my-auto size-10" />
        <h1 className="hidden text-4xl font-bold xl:block">Piggram</h1>
      </Link>

      <div className="mt-6 flex w-full flex-grow flex-col space-y-4">
        <NavButtonLink to="/" className="group">
          <Home className="my-auto mr-1 size-8 transition-all group-hover:scale-125" />
          <span className="hidden xl:block">Home</span>
        </NavButtonLink>

        <NavButtonLink to="/" className="group">
          <Search className="my-auto mr-1 size-8 transition-all group-hover:scale-125" />
          <span className="hidden xl:block">Search</span>
        </NavButtonLink>

        <NavButtonLink to="upload" className="group">
          <PlusSquare className="my-auto mr-1 size-8 transition-all group-hover:scale-125" />
          <span className="hidden xl:block">Post</span>
        </NavButtonLink>

        {isSignedIn && (
          <NavButtonLink to={`/profile/${user?.userId}`} className="group">
            <Avatar className="mr-1 size-8 transition-all group-hover:scale-125">
              <AvatarImage src={user?.picture} alt={user?.firstName} />
              <AvatarFallback>PFP</AvatarFallback>
            </Avatar>
            <span className="hidden overflow-clip xl:block">
              {user?.firstName}
              {user?.lastName && ` ${user?.lastName}`}
            </span>
          </NavButtonLink>
        )}
      </div>

      <OptionsDiv />
    </nav>
  );
}

function OptionsDiv() {
  const { isSignedIn } = useUser();

  return (
    <div className="w-full">
      {isSignedIn ? (
        <UserDropdown />
      ) : (
        <div className="flex flex-col space-y-2 xl:flex-row-reverse xl:space-y-0">
          <ThemeToggle />
          <a
            className="mx-auto w-12 xl:mr-2 xl:flex-grow"
            href={`${import.meta.env.VITE_APP_API_URL}/auth/google/login`}
          >
            <NavButton variant="default" className="group">
              <LogIn className="my-auto size-8 transition-all group-hover:scale-125 xl:mr-2" />
              <span className="hidden xl:block">Login</span>
            </NavButton>
          </a>
        </div>
      )}
    </div>
  );
}
