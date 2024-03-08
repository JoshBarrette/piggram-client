import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$profileId")({
  component: Profile,
});

function Profile() {
  const { profileId } = Route.useParams();

  return (
    <div className="h-full w-full p-2">
      <p>profileId: {profileId}</p>
    </div>
  );
}
