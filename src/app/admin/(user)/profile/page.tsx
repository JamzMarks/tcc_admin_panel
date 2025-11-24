import { PageTitle } from "@/components/ui/elements/PageTitle";
import { ProfileWrapper } from "./components/ProfileWrapper";
import { UserInfo } from "./components/UserInfo";

const ProfilePage = () => {
  return (
    <div className="space-y-4 grid">
      <PageTitle>
        User Profile
      </PageTitle>
      <ProfileWrapper/>
      <UserInfo/>
    </div>
  );
};

export default ProfilePage;
