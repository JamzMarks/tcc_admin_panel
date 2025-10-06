
import { LucideIcon } from "lucide-react";
import Link from "next/link";

type CardProps = {
    title: string;
    description: string;
    href: string;
    Icon?: LucideIcon
};

export function ServiceCard({title, description, href, Icon}: CardProps) {
  return (
    <div>
      <div className="space-y-4 cursor-pointer p-4 rounded-2xl  bg-white dark:bg-foreground-dark hover:shadow-md transition-all border border-gray-200 dark:border-none">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex gap-2">
          {Icon && 
            <Icon/>
          }
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          {description}
        </p>
        <span className="inline-block mt-4 text-sm font-medium text-primary">
          Abrir →
        </span>
      </div>
    </div>
  );
}