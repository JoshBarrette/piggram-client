import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/edit/")({
  component: () => (
    <div className="h-full w-full p-2">
      <p>edit profile here</p>
    </div>
  ),
});
