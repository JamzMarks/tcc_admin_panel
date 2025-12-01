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
import { CameraForm } from "./CameraForm";



export function CreateNewCamera() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2  text-white cursor-pointer"
      >
        <PlusCircle size={18} />
        Create new Yolo Camera
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle><div className="flex items-center gap-2"><Plus className="text-primary"/> New Yolo Camera</div></DialogTitle>
            <DialogDescription>
              Fill the form to register a new traffic light device.
            </DialogDescription>
          </DialogHeader>
          <CameraForm/>
        </DialogContent>
      </Dialog>
    </>
  );
}
