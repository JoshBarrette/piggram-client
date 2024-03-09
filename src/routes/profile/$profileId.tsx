import { createFileRoute } from "@tanstack/react-router";
import ProfileHeader from "~/components/profile/profile-header";
import { ScrollArea } from "~/components/ui/scroll-area";
import axios from "axios";

export type Profile = {
  userId: string;
  firstName: string;
  lastName?: string;
  followingCount: string;
  followersCount: string;
  joinDate: string;
};

export type ProfileResponse = {
  profileFound: boolean;
  profile?: Profile;
};

export const Route = createFileRoute("/profile/$profileId")({
  component: Profile,
  loader: async ({ params: { profileId } }): Promise<ProfileResponse> => {
    return await axios
      .get<ProfileResponse>(
        `${import.meta.env.VITE_APP_API_URL}/users/profile/${profileId}`,
      )
      .then((r) => r.data);
  },
});

function Profile() {
  const { profileFound, profile } = Route.useLoaderData();

  if (!profileFound || !profile) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>User Not Found</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <ScrollArea className="flex">
        <ProfileHeader profile={profile} />
      </ScrollArea>
    </div>
  );
}
