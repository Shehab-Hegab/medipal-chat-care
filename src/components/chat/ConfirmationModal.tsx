import { ReminderData } from "@/types/chat";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Pill, Calendar } from "lucide-react";

interface ConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reminder: ReminderData;
  onConfirm: () => void;
  onEdit: () => void;
  onCancel: () => void;
}

export const ConfirmationModal = ({
  open,
  onOpenChange,
  reminder,
  onConfirm,
  onEdit,
  onCancel,
}: ConfirmationModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Pill className="w-5 h-5 text-primary" />
            Confirm Medication Reminder
          </DialogTitle>
          <DialogDescription>
            Please review your reminder details before confirming.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary-50">
              <Pill className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{reminder.medication_name}</p>
              <p className="text-sm text-muted-foreground">Dose: {reminder.dose}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Calendar className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Frequency</p>
              <p className="text-sm text-muted-foreground">
                {reminder.frequency_description || reminder.frequency}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-accent/10">
              <Clock className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-foreground">Start Time</p>
              <p className="text-sm text-muted-foreground">
                {new Date(reminder.start_time).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={onCancel} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button variant="outline" onClick={onEdit} className="w-full sm:w-auto">
            Edit
          </Button>
          <Button onClick={onConfirm} className="w-full sm:w-auto">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
