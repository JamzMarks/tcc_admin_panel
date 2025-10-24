import { UserResponseDto } from "@/types/interfaces/me";
import Image from "next/image";

interface ProfileHeaderProps {
  user: UserResponseDto | null;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  if (!user) {
    return (
      <div className="text-center text-gray-500 py-8">
        Loading user profile...
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 items-center md:items-start">
      <div className="flex gap-4 items-center">
        <div className="relative w-28 h-28 flex-shrink-0">
          <Image
            src={user.avatar ?? "https://picsum.photos/200/300"}
            alt="profile image"
            fill
            className="rounded-full object-cover border-2 border-primary"
          />
        </div>
        <div>
          <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Role: <span className="font-medium">{user.role}</span>
          </p>
        </div>
      </div>
    </div>
  );
};
