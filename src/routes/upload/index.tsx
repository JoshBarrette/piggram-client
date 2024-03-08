import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/upload/")({
  component: () => (
    <div className="h-full w-full p-2">
      <p>Upload</p>
    </div>
  ),
});
