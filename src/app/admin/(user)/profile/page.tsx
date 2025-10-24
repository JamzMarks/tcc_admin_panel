import { ProfileConnections } from "./components/ProfileConnections";
import {
  SectionWithHeader,
  SimpleSection,
} from "@/components/ui/sections/SimpleSection";
import { PageTitle } from "@/components/ui/elements/PageTitle";
import { ProfileWrapper } from "./components/ProfileWrapper";


const mockUser = {
  name: "James Marques",
  avatar_url: "https://picsum.photos/200/300",
  email: "jamzmarks@gmail.com",
};

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
