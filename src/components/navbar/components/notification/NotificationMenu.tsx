"use client";
import { useEffect, useRef, useState } from "react";
import { NotificationModal } from "../modals/NotificationModal";
import { NotificationButton } from "./NotificationButton";

export const NotificationMenu = () => {
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
          <NotificationButton/>
        </button>
      </div>
      {isOpen && (
        <div ref={modalRef} className="absolute right-20 top-20 ease-in ">
          <NotificationModal />
        </div>
      )}
    </>
  );
};
