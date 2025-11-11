import { MedicationInfo } from "@/types/chat";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Pill } from "lucide-react";

interface MedicationCardProps {
  medInfo: MedicationInfo;
}

export const MedicationCard = ({ medInfo }: MedicationCardProps) => {
  return (
    <Card className="border-primary/20 shadow-md animate-scale-in mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Pill className="w-5 h-5 text-primary" />
          {medInfo.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-1">Common Uses</h4>
          <p className="text-sm text-muted-foreground">{medInfo.common_uses}</p>
        </div>
        
        <div>
          <h4 className="font-semibold text-sm text-foreground mb-1">Side Effects</h4>
          <p className="text-sm text-muted-foreground">{medInfo.side_effects}</p>
        </div>

        <div className="flex items-start gap-2 pt-2 border-t border-border">
          <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground italic">
            This information is not a substitute for professional medical advice. Always consult your healthcare provider.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
