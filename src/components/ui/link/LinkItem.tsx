"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ServiceItemProps {
  children: React.ReactNode;
  linkTo: string;
  className?: string;
  soon?: boolean;
}

export const LinkItem = ({
  children,
  linkTo,
  soon = false,
  className,
}: ServiceItemProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === linkTo ||
    (pathname.startsWith(linkTo + "/") && linkTo !== "/admin");
  return (
    <div className="flex items-center text-sm">
      <li className="w-full">
        <Link href={linkTo} passHref >
          <div
            className={`flex justify-between items-center p-2 rounded-md font-inter text-secondary-content                  
                ${
                  soon
                    ? "line-through text-gray-500 cursor-default"
                    : `
                ${
                  isActive
                    ? "font-semibold text-primary dark:text-primary-green bg-orange-100 dark:bg-neutral-900"
                    : "text-zinc-600 hover:bg-gray-200 dark:text-text-light dark:hover:bg-zinc-800"
                }
                `
                }
                ${className ?? ""}
            `}
            onClick={(e) => soon && e.preventDefault()}
          >
            <div className="flex gap-2 items-center font-semibold">{children}</div>
            {soon && (
              <div className="bg-primary-green rounded-xl p-1 text-xs self-end text-gray-200 no-underline">
                <p>Soon</p>
              </div>
            )}
          </div>
        </Link>
      </li>
    </div>
  );
};
// className="bg- text-primary-green dark:"
