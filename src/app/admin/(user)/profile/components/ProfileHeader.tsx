import Image from "next/image";
export const ProfileHeader = () => {
    
const mockUser = {
  name: "James Marques",
  avatar_url: "https://picsum.photos/200/300",
  email: "jamzmarks@gmail.com",
};
  return (
    <div className="flex gap-4 justify-between">
      <div className="flex gap-4">
        <div className="relative w-24 h-24 ">
          <Image
            src={mockUser.avatar_url}
            alt="profile image"
            fill
            className="rounded-full object-center"
          />
        </div>
        <div>
          <p className="text-2xl font-bold text-primary">{mockUser.name}</p>
          <p className="text-gray-500">{mockUser.email}</p>
        </div>
      </div>
      <div className="flex flex-col justify-evenly">
        <button className="cursor-pointer bg-primary text-white px-2 py-1 rounded-lg text-sm">
          Update account
        </button>
      </div>
    </div>
  );
};
