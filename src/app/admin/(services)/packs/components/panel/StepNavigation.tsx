"use client";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StepNavigationProps {
  steps: { title: string; icon: LucideIcon }[];
  currentStep: number;
  onStepClick?: (index: number) => void;
}

export const StepNavigation = ({ steps, currentStep, onStepClick }: StepNavigationProps) => {
  return (
    <div className="flex space-x-2 w-full">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isActive = index === currentStep;

        return (
          <Button
            key={index}
            variant={isActive ? "default" : "outline"}
            size="sm"
            onClick={() => onStepClick?.(index)}
            className="flex-1 flex items-center justify-center aspect-square rounded-md min-h-12"
          >
            <Icon className={`w-8 h-8 ${isActive ? "text-white" : "text-muted-foreground"}`} />
            <span className={`text-md font-medium ${isActive ? "text-white" : "text-muted-foreground"} text-center`}>
              {step.title}
            </span>
          </Button>
        );
      })}
    </div>
  );
};
