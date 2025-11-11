import { Button } from "@/components/ui/button";
import { Bell, List, Info } from "lucide-react";

interface QuickActionsProps {
  onAction: (action: string) => void;
}

export const QuickActions = ({ onAction }: QuickActionsProps) => {
  const actions = [
    { label: "Set Reminder", icon: Bell, action: "Set a medication reminder" },
    { label: "Show Reminders", icon: List, action: "Show my reminders" },
    { label: "Med Info", icon: Info, action: "Tell me about a medication" },
  ];

  return (
    <div className="flex flex-wrap gap-2 px-4 py-3 bg-muted/30">
      {actions.map((item) => (
        <Button
          key={item.label}
          variant="outline"
          size="sm"
          className="text-xs"
          onClick={() => onAction(item.action)}
        >
          <item.icon className="w-3 h-3 mr-1.5" />
          {item.label}
        </Button>
      ))}
    </div>
  );
};
