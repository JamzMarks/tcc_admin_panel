import { PageTitle } from "@/components/ui/elements/PageTitle";
import { ProfileWrapper } from "./components/ProfileWrapper";

const ProfilePage = () => {
  return (
    <div className="space-y-4 grid">
      <PageTitle>
        User Profile
      </PageTitle>
      <ProfileWrapper/>
    </div>
  );
};

export default ProfilePage;
