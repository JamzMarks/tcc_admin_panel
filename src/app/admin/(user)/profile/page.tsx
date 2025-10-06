import Image from "next/image";
import { ProfileConnections } from "./components/ProfileConnections";
import { ProfileHeader } from "./components/ProfileHeader";
import { ProfilePlan } from "./components/ProfilePlan";
import {
  SectionWithHeader,
  SimpleSection,
} from "@/components/ui/sections/SimpleSection";
import { PageTitle } from "@/components/ui/elements/PageTitle";

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
      <SectionWithHeader title="Account">
        <ProfileHeader />
      </SectionWithHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionWithHeader title="Info">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ProfileConnections
              googleConnected={false}
              githubConnected={true}
            />
          </div>
        </SectionWithHeader>
        <SectionWithHeader title="Info">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ProfileConnections
              googleConnected={false}
              githubConnected={true}
            />
          </div>
        </SectionWithHeader>
      </div>
    </div>
  );
};

export default ProfilePage;
