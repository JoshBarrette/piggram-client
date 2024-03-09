import { createFileRoute } from "@tanstack/react-router";
import { isAuthed } from "~/lib/utils";

// TODO: get this to work
export const Route = createFileRoute("/_auth")({
  beforeLoad: () => isAuthed(),
});
