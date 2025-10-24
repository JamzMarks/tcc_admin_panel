'use client'
import { SectionWithHeader } from "@/components/ui/sections/SimpleSection";
import { useEffect, useState } from "react";
import { AuthClient } from "@/services/auth.service";
import { UserResponseDto } from "@/types/interfaces/me";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileConnections } from "./ProfileConnections";

export const ProfileWrapper = () => {
  const [user, setUser] = useState<UserResponseDto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await AuthClient.Me();
        if (res?.data) {
          setUser(res.data);
        } else {
          setError("User data not found");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch user data");
      }
    };
    getUser();
  }, []);

  if (error) {
    return <div className="text-red-500 text-center mt-8">{error}</div>;
  }

  if (!user) {
    return <div className="text-gray-500 text-center mt-8">Loading user data...</div>;
  }

  return (
    <>
      <SectionWithHeader title="Account">
        <ProfileHeader user={user} />
      </SectionWithHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SectionWithHeader title="Info">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ProfileConnections googleConnected={false} githubConnected={true} />
          </div>
        </SectionWithHeader>
        <SectionWithHeader title="Info">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ProfileConnections googleConnected={false} githubConnected={true} />
          </div>
        </SectionWithHeader>
      </div>
    </>
  );
};

