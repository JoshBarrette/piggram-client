import { Profile } from "~/routes/profile/$profileId";

export default function ProfileHeader({ profile }: { profile: Profile }) {
  return (
    <>
      <p>profile header</p>
      <p>{profile?.userId}</p>
    </>
  );
}
