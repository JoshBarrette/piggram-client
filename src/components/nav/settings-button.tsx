import { Settings } from "lucide-react";
import { NavIconButton } from "../ui/nav-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useTheme } from "../theme/theme-provider";
import useUser from "~/hooks/useUser";

export default function SettingsButton() {
  const theme = useTheme();
  const { signOut, isSignedIn } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <NavIconButton className="group">
          <Settings className="size-6 transition-all group-hover:size-8" />
        </NavIconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger className="text-xl font-semibold">
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                className="text-xl font-semibold"
                onClick={() => theme.setTheme("dark")}
              >
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-xl font-semibold"
                onClick={() => theme.setTheme("light")}
              >
                Light
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-xl font-semibold"
                onClick={() => theme.setTheme("system")}
              >
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>

        {isSignedIn && (
          <DropdownMenuItem className="text-xl font-semibold" onClick={signOut}>
            Sign Out
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
