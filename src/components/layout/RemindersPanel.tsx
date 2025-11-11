import { ReminderData } from "@/types/chat";
import { ReminderCard } from "@/components/chat/ReminderCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarClock, Sparkles } from "lucide-react";

interface RemindersPanelProps {
  reminders: ReminderData[];
  onSnooze: (reminderId: string, minutes: number) => void;
  onCancel: (reminderId: string) => void;
}

export const RemindersPanel = ({ reminders, onSnooze, onCancel }: RemindersPanelProps) => {
  return (
    <Card className="border-primary/20 shadow-lg h-full">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <CalendarClock className="w-5 h-5 text-primary" />
          Today's Reminders
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {reminders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="p-4 rounded-full bg-primary-50 mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground mb-1">No upcoming medications</p>
            <p className="text-xs text-muted-foreground">Ask me to set one!</p>
          </div>
        ) : (
          reminders.map((reminder, index) => (
            <ReminderCard
              key={reminder.reminder_id || index}
              reminder={reminder}
              onSnooze={(minutes) => onSnooze(reminder.reminder_id || String(index), minutes)}
              onCancel={() => onCancel(reminder.reminder_id || String(index))}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
};
