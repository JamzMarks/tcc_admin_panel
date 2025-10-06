import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import clsx from "clsx";

interface SimpleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  //   Icon?: ForwardRefExoticComponent<
  //     Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  //   >;
}

export const SimpleButton = ({ children, onClick }: SimpleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="flex cursor-pointer text-nowrap items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-950 font-semibold text-primary-green dark:text-primary-green rounded-lg hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors"
    >
      {children}
    </button>
  );
};


interface UserButtonActionsProps {
  color?: "blue" | "red" | "green" | "yellow"; // lista de cores suportadas
  onClick?: () => void;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
}

export const UserButtonActions = ({
  Icon,
  onClick,
  color = "blue",
}: UserButtonActionsProps) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800",
    red: "bg-red-100 text-red-600",
    green: "hover:bg-green-100 text-green-600",
    yellow: "hover:bg-yellow-100 text-yellow-600",
  };

  return (
    <button
      onClick={onClick}
      className={clsx(
        "p-2 rounded text-sm cursor-pointer transition-colors dark:hover:bg-neutral-800",
        colorMap[color]
      )}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};
