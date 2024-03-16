import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/p/$id/comment")({
  component: () => (
    <div className="fixed top-0 h-screen w-screen">
      <div className="flex h-full items-center justify-center">
        <p className="bg-red-800 p-2">
          comment route for {Route.useParams().id}
        </p>
      </div>
    </div>
  ),
});
