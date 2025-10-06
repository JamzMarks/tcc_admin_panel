import { User } from "lucide-react";
import Image from "next/image";

interface UserButtonProps {
  userImg?: string;
  username: string;
}

export const UserButton = ({ userImg, username }: UserButtonProps) => {
  return (
    <div className=" flex items-center align-middle gap-2 text-sm cursor-pointer">
      <div className=" relative rounded-full bg-orange-700 p-1 text-white ">
        {userImg ? (
          <Image
            src={userImg}
            alt="profile image"
            fill
            className="object-contain text-sm"
          />
        ) : (
          <User className="w-5 h-5"/>
        )}
        
      </div>
      <p className="text-nowrap">{username}</p>
    </div>
  );
};
