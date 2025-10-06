"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus, PlusCircle } from "lucide-react";
import { TrafficLightForm } from "./TrafficLightForm";


export function CreateTrafficLight() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2  text-white cursor-pointer"
      >
        <PlusCircle size={18} />
        Create new Traffic Light
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle><div className="flex items-center gap-2"><Plus className="text-primary"/> New Traffic Light</div></DialogTitle>
            <DialogDescription>
              Fill the form to register a new traffic light device.
            </DialogDescription>
          </DialogHeader>

          <TrafficLightForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
