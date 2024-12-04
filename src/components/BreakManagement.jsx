import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CoffeeIcon,
  PlayIcon,
  MonitorStopIcon as StopIcon,
} from "lucide-react";

export default function BreakManagement({
  isCheckedIn,
  breaks,
  onStartBreak,
  onEndBreak,
}) {
  const activeBreak = breaks.find((b) => b.end === null);
  const breakCount = breaks.length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CoffeeIcon className="mr-2" />
          Break Management
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm font-medium">Breaks taken: {breakCount}/3</p>
          <Button
            onClick={activeBreak ? onEndBreak : onStartBreak}
            disabled={!isCheckedIn || (!activeBreak && breakCount >= 3)}
            className="w-full"
            variant={activeBreak ? "destructive" : "default"}
          >
            {activeBreak ? (
              <>
                <StopIcon className="mr-2 h-4 w-4" /> End Break
              </>
            ) : (
              <>
                <PlayIcon className="mr-2 h-4 w-4" /> Start Break
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
