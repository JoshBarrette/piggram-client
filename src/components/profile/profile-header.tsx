import { getFullName } from "~/lib/utils";
import { PiggramProfile } from "~/types/profile";

export default function ProfileHeader({
  profile,
}: {
  profile: PiggramProfile;
}) {
  return (
    <div className="container flex">
      <img
        className="rounded-full"
        src={profile.picture}
        alt={profile.firstName}
        width="200"
        height="200"
      />

      <div>
        <p className="text-4xl">
          {getFullName(profile.firstName, profile.lastName)}
        </p>
      </div>
    </div>
  );
}
