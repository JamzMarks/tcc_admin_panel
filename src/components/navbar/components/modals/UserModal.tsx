
import { LinkItem } from "@/components/ui/link/LinkItem";
import { LogOut, Settings, User } from "lucide-react";


export const UserModal = () => {
  return (
    <div className="bg-white rounded-lg z-50 w-52 p-2 dark:bg-background-dark dark:border dark:border-zinc-800">
      <ul className="space-y-1 text-sm">
        <LinkItem linkTo="/admin/profile">
          <User />
          Profile
        </LinkItem>
  
        <LinkItem linkTo="/admin/settings">
          <Settings />
          Settings
        </LinkItem>
        <button
          onClick={() => console.log("logout")}
          className="cursor-pointer text-red-400  hover:bg-red-50 dark:hover:bg-red-950 flex gap-2 items-center w-full justify-start p-2 rounded-md text-sm"
        >
          <LogOut />
          LogOut
        </button>
      </ul>
    </div>
  );
};
