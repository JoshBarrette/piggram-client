import { createFileRoute } from "@tanstack/react-router";
import ProfileHeader from "~/components/profile/profile-header";
import { ScrollArea } from "~/components/ui/scroll-area";
import axios from "axios";
import { PiggramPost } from "~/types/posts";
import { PiggramProfile } from "~/types/profile";

export type ProfileResponse = {
  profileFound: boolean;
  profile?: PiggramProfile;
  posts: PiggramPost[];
};

export const Route = createFileRoute("/profile/$profileId")({
  component: Profile,
  loader: async ({ params: { profileId } }): Promise<ProfileResponse> => {
    const profileUser: ProfileResponse = await axios
      .get<ProfileResponse>(
        `${import.meta.env.VITE_APP_API_URL}/users/profile/${profileId}`,
      )
      .then((r) => r.data);

    const userPosts = await axios
      .get(`${import.meta.env.VITE_APP_API_URL}/posts/user/${profileId}`)
      .then((r) => r.data);

    return { ...profileUser, posts: userPosts };
  },
});

function Profile() {
  const loader = Route.useLoaderData();

  if (!loader.profileFound || !loader.profile) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>User Not Found</p>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <ScrollArea className="flex">
        <ProfileHeader profile={loader.profile} />
      </ScrollArea>
    </div>
  );
}
