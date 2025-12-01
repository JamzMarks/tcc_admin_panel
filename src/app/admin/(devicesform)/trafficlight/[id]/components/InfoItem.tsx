import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export const InfoItem = ({
  icon,
  label,
  value,
  editable,
  disabled,
  onEdit,
  hidden = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  editable?: boolean;
  disabled?: boolean;
  onEdit?: () => void;
  hidden?: boolean;
}) => {
  const [isHidden, setIsHidden] = useState(hidden);

  const maskedValue = "*".repeat(Math.max(6, value.length));

  return (
    <div className="flex items-center justify-between p-3 border rounded-xl bg-card">
      <div className="flex align-middle gap-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {icon}
          {label}:
        </div>

        <p className="text-lg font-semibold break-all">
          {isHidden ? maskedValue : value}
        </p>
      </div>

      {/* Botão só aparece se hidden existir */}
      {hidden && !disabled && (
        <Button
          size="icon"
          variant="outline"
          onClick={() => setIsHidden((v) => !v)}
        >
          {isHidden ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </Button>
      )}
    </div>
  );
};
