'use client';

import { FC } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface HttpModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  type?: 'error' | 'success' | 'confirm';
  onClose: () => void;
  onConfirm?: () => void; // apenas para confirmação
}

const HttpModal: FC<HttpModalProps> = ({
  isOpen,
  title,
  message,
  type = 'success',
  onClose,
  onConfirm,
}) => {

  // cores e ícones
  const colors = {
    success: 'text-green-500 border-green-500',
    error: 'text-red-500 border-red-500',
  };

  const icons = {
    success: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg
        className="w-8 h-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader className="flex flex-col items-center space-y-4">
          {/* Animação */}
          {type === 'success' || type === 'error' ? (
            <div className="relative w-16 h-16">
              <div
                className={`absolute inset-0 rounded-full border-4 animate-spin-slow ${type === 'success' ? 'border-green-300' : 'border-red-300'}`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                {icons[type]}
              </div>
            </div>
          ) : null}

          <DialogTitle className="text-center">
            {title || (type === 'error' ? 'Erro' : type === 'confirm' ? 'Confirmação' : 'Sucesso')}
          </DialogTitle>
          <DialogDescription className="text-center">{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end space-x-2 mt-4">
          {type === 'confirm' && (
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
          )}
          <Button
            variant={type === 'error' ? 'destructive' : 'default'}
            onClick={type === 'confirm' ? onConfirm : onClose}
          >
            {type === 'confirm' ? 'Confirmar' : 'Fechar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default HttpModal;
