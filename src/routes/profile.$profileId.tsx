import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$profileId")({
  component: Profile,
});

function Profile() {
  const { profileId } = Route.useParams();

  return (
    <div className="h-full">
      <p>profileId: {profileId}</p>
    </div>
  );
}
