
import Image from "next/image";
import { UserMenu } from "./components/user/UserMenu";
import { NotificationMenu } from "./components/notification/NotificationMenu";
import { MenuButton } from "./components/MenuButton";
import { LogosPath } from "../ui/logo";


export const Navbar = () => {
  return (
    // <nav className="bg-white dark:bg-background-dark fixed w-full h-20 flex justify-between top-0 px-4 z-50 border-b border-gray-200 gap-4 dark:border-zinc-800">
    <nav className="fixed bg-white dark:bg-background-dark w-full h-20 flex justify-between z-50 border-b border-gray-200 gap-4 dark:border-zinc-800">
      <div className=" h-full flex gap-2 w-[240px] ml-4 pl-2">
          <MenuButton/>
        <div className="relative w-24 ">

          <Image
          src={LogosPath.logo}
          alt="logo"
          fill
          className="object-contain darK"
          />
        </div>
      </div>
      <div className="flex gap-4 h-full w-[240px] pr-2 justify-end mr-4">
        <NotificationMenu/>
        <UserMenu/>
      </div>

    </nav>
  );
};
