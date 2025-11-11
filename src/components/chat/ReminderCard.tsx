import { ReminderData } from "@/types/chat";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Pill, X } from "lucide-react";
import { format } from "date-fns";

interface ReminderCardProps {
  reminder: ReminderData;
  onSnooze?: (minutes: number) => void;
  onCancel?: () => void;
}

export const ReminderCard = ({ reminder, onSnooze, onCancel }: ReminderCardProps) => {
  const nextTime = reminder.next_occurrence 
    ? format(new Date(reminder.next_occurrence), "h:mm a")
    : format(new Date(reminder.start_time), "h:mm a");

  return (
    <Card className="border-l-4 border-l-accent shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary-50">
              <Pill className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">{reminder.medication_name}</h4>
              <p className="text-sm text-muted-foreground">{reminder.dose}</p>
            </div>
          </div>
          {onCancel && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={onCancel}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>
            {reminder.frequency_description || reminder.frequency} • Next: {nextTime}
          </span>
        </div>

        {onSnooze && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onSnooze(10)}
            >
              Snooze 10m
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={() => onSnooze(30)}
            >
              Snooze 30m
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
