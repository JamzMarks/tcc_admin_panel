import clsx from "clsx";
import { LucideIcon } from "lucide-react";

interface ActionTableButtonProps {
  color?: "blue" | "red" | "green" | "yellow"; 
  onClick?: () => void;
  Icon: LucideIcon;
  label?: string;
}

export const ActionTableButton = ({
  Icon,
  onClick,
  color = "blue",
  label
}: ActionTableButtonProps) => {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-transparent dark:text-blue-400 dark:border dark:border-blue-400 dark:hover:bg-blue-800/20",
    red: "bg-red-100 text-red-600 hover:bg-red-200 dark:bg-transparent dark:text-red-400 dark:border dark:border-red-400 dark:hover:bg-red-800/20",
    green: "bg-green-100 text-green-600 hover:bg-green-200 dark:bg-transparent dark:text-green-400 dark:border dark:border-green-400 dark:hover:bg-green-800/20",
    yellow: "bg-yellow-100 text-yellow-600 hover:bg-yellow-200 dark:bg-transparent dark:text-yellow-400 dark:border dark:border-yellow-400 dark:hover:bg-yellow-800/20",
  };

  return (
    <button
      aria-label={label ?? ""}
      onClick={onClick}
      className={clsx(
        "p-2 rounded text-sm cursor-pointer transition-colors",
        colorMap[color]
      )}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
};
