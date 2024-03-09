import { createFileRoute } from "@tanstack/react-router";
import { isAuthed } from "~/lib/utils";

export const Route = createFileRoute("/profile/edit/")({
  beforeLoad: () => isAuthed(),
  component: () => (
    <div className="h-full w-full p-2">
      <p>edit profile here</p>
    </div>
  ),
});
