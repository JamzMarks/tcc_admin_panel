import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface RequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  message?: string;
  asyncAction: () => Promise<any>;
  onSuccess?: (result: any) => void;
  onError?: (error: any) => void;
  confirmText?: string;
  cancelText?: string;
}

export const RequestModal = ({
  open,
  onOpenChange,
  title = "Confirmação",
  message = "Deseja realmente executar esta ação?",
  asyncAction,
  onSuccess,
  onError,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
}: RequestModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncAction();
      onSuccess?.(result);
      onOpenChange(false);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Ocorreu um erro.");
      onError?.(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[350px] sm:w-[400px] p-0">
        <SheetHeader className="border-b px-4 py-3">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>

        <div className="p-4 text-md">
          <p>{message}</p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        <div className="flex justify-end gap-2 p-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={loading}
            className={loading ? "opacity-50 cursor-not-allowed" : ""}
          >
            {loading ? "Executando..." : confirmText}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
