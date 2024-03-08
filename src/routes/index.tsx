import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "~/components/theme-provider";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const theme = useTheme();

  return (
    <div className="z-0 flex h-full w-full items-center justify-center md:w-full xl:absolute xl:w-screen">
      <ScrollArea className="h-full w-full md:w-[650px]">
        <div className="flex h-full w-full flex-col items-center">
          <Button
            onClick={() => {
              theme.theme !== "light"
                ? theme.setTheme("light")
                : theme.setTheme("dark");
            }}
          >
            toggle theme
          </Button>
          <Button onClick={() => theme.setTheme("system")}>system theme</Button>
        </div>
      </ScrollArea>
    </div>
  );
}
