import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface DeadlineInputProps {
  onSetDeadline: (deadline: Date) => void;
  currentDeadline: Date | null;
}

const DeadlineInput = ({ onSetDeadline, currentDeadline }: DeadlineInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    currentDeadline || undefined
  );
  const [timeValue, setTimeValue] = useState(
    currentDeadline ? format(currentDeadline, "HH:mm") : "23:59"
  );

  const handleSetDeadline = () => {
    if (!selectedDate) return;

    const [hours, minutes] = timeValue.split(":").map(Number);
    const deadline = new Date(selectedDate);
    deadline.setHours(hours, minutes, 0, 0);

    onSetDeadline(deadline);
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-4 bg-card/50 backdrop-blur-sm border border-primary/20 rounded-xl p-6 shadow-lg shadow-primary/10">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-display font-semibold text-foreground">
            Select Date
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-primary/30 hover:border-primary hover:bg-primary/10 transition-all",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-popover border-primary/30" align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="text-sm font-display font-semibold text-foreground">
            Select Time
          </Label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary" />
            <Input
              id="time"
              type="time"
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
              className="pl-10 border-primary/30 focus:border-primary bg-input/50 backdrop-blur-sm"
            />
          </div>
        </div>

        <Button
          onClick={handleSetDeadline}
          disabled={!selectedDate}
          className="w-full font-display font-bold text-lg bg-gradient-cyber hover:opacity-90 transition-opacity shadow-lg shadow-primary/30 hover:shadow-primary/50"
        >
          START COUNTDOWN
        </Button>
      </div>

      {currentDeadline && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Current deadline:{" "}
            <span className="font-display font-semibold text-primary">
              {format(currentDeadline, "PPP 'at' HH:mm")}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default DeadlineInput;
