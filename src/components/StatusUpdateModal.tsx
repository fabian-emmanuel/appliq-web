import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {Status} from "@/types/Applications.ts"; // Import Label

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (note: string) => void; // Revert onSubmit signature
  company: string;
  position: string;
  newStatus: Status;
}

export function StatusUpdateModal({
  isOpen,
  onClose,
  onSubmit,
  company,
  position,
  newStatus,
}: Props) {
  const [note, setNote] = useState("");

  // Reset note when modal opens
  useEffect(() => {
    if (isOpen) {
      setNote("");
    }
  }, [isOpen]);

  const handleSave = () => {
    onSubmit(note);
    onClose(); // Close modal after submission
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Status to "{newStatus}"</DialogTitle>
          <DialogDescription>
            Add a note for the status change for {position} at {company}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="note">Note (Optional)</Label>
            <Textarea
              id="note"
              placeholder={`Enter details about the ${newStatus} stage...`}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSave}>
            Save Status Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
