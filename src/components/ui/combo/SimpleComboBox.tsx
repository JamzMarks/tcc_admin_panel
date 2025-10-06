import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

type Option = {
  value: string;
  label: string;
};

interface SimpleComboBoxProps<T extends Option> {
  description: string;
  options: T[];
  resource: string;
  placeholder: string;
  onChange: (value: string) => void;
  customWidth?: number | "full";
}

export const SimpleComboBox = <T extends Option>({
  description,
  resource,
  options,
  placeholder,
  onChange,
  customWidth,
}: SimpleComboBoxProps<T>) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const t = useTranslations("Modal.ComboBox");

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    onChange(newValue);
    setOpen(false);
  };
  const widthClass = customWidth
    ? typeof customWidth === "number"
      ? `w-[${customWidth}px]`
      : `w-[${customWidth}]`
    : "w-[200px]";

  return (
    <Popover open={open} onOpenChange={setOpen} >
      <PopoverTrigger asChild className={`${widthClass}`}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`${widthClass} justify-between`}
        >
          {value
            ? options.find((option: T) => option.value === value)?.label
            : `${description}`}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`${widthClass} p-0`}>
        <Command>
          <CommandInput placeholder={placeholder} className="h-9" />
          <CommandList>
            <CommandEmpty>
              <CommandEmpty>
                {t.rich("notFound", {
                  resource: resource,
                  object: (chunks) => (
                    <span className="font-semibold">{chunks}</span>
                  ),
                })}
              </CommandEmpty>
            </CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={() => handleSelect(option.value)}
                >
                  {option.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
