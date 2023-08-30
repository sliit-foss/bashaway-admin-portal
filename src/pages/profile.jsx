import { ProfileHeader } from "@/components/profile";
import { useEffectOnce, useTitle } from "@/hooks";
import { useAuthUserQuery } from "@/store/api";
import { BreadCrumbs, Button } from "@sliit-foss/bashaway-ui/components";

const Profile = () => {
  const { data: { data: team } = {} } = useAuthUserQuery();

  useTitle("Profile | Bashaway");

  useEffectOnce(() => window.scroll({ top: 0, behavior: "smooth" }));

  return (
    <div className="w-full flex flex-col items-center min-h-[60vh]">
      <BreadCrumbs breadcrumbs={["Home", "Profile"]} />
      <div className="flex-1 flex flex-col justify-center items-center mt-8">
        <ProfileHeader team={team} />
        <Button to="/change-password" className="my-5 font-semibold">
          Change Password
        </Button>
      </div>
    </div>
  );
};

export default Profile;
