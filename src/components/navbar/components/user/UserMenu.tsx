"use client";
import { useEffect, useRef, useState } from "react";
import { UserModal } from "../modals/UserModal";
import { UserButton } from "./UserButton";


export const UserMenu = () => {
  // const session = useSession()
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="flex items-center align-middle gap-2 text-sm cursor-pointer">
        <button onClick={handleModal}>
          <UserButton username={ 'Name'} />
        </button>
      </div>
      {isOpen && (
        <div ref={modalRef} className="absolute right-0 top-20 ease-in ">
          <UserModal />
        </div>
      )}
    </>
  );
};
