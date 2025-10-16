import { useEffect, useState } from "react";

interface TimerProps {
  deadline: Date | null;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const Timer = ({ deadline }: TimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining | null>(null);

  useEffect(() => {
    if (!deadline) {
      setTimeRemaining(null);
      return;
    }

    const calculateTimeRemaining = (): TimeRemaining => {
      const now = new Date();
      const difference = deadline.getTime() - now.getTime();

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds, total: difference };
    };

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());

    // Update every second
    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [deadline]);

  if (!deadline) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-display font-bold text-muted-foreground">
          Set a deadline to start the countdown
        </h2>
      </div>
    );
  }

  if (!timeRemaining) {
    return null;
  }

  const isFinished = timeRemaining.total <= 0;
  const isUrgent = timeRemaining.total < 60 * 60 * 1000; // Less than 1 hour
  const isCritical = timeRemaining.total < 10 * 60 * 1000; // Less than 10 minutes

  if (isFinished) {
    return (
      <div className="text-center space-y-8 animate-pulse-glow">
        <h1 className="text-8xl md:text-9xl font-display font-black text-danger text-glow-danger animate-blink">
          TIME'S UP!
        </h1>
        <p className="text-2xl md:text-3xl font-display text-primary">
          HACKATHON FINISHED!
        </p>
      </div>
    );
  }

  const getTimerColorClass = () => {
    if (isCritical) return "text-danger text-glow-danger animate-blink";
    if (isUrgent) return "text-warning text-glow-warning";
    return "text-primary text-glow";
  };

  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className="text-center space-y-8">
      <div className={`font-display font-black ${getTimerColorClass()} transition-colors duration-300 tabular-nums`}>
        {timeRemaining.days > 0 ? (
          <div className="space-y-2">
            <div className="flex items-center justify-center text-7xl md:text-9xl lg:text-[12rem]">
              <span className="inline-block w-[1.2em]">{formatNumber(timeRemaining.days).charAt(0)}</span>
              <span className="inline-block w-[1.2em]">{formatNumber(timeRemaining.days).charAt(1)}</span>
              <span className="text-5xl md:text-7xl lg:text-8xl mx-2">:</span>
              <span className="inline-block w-[1.2em]">{formatNumber(timeRemaining.hours).charAt(0)}</span>
              <span className="inline-block w-[1.2em]">{formatNumber(timeRemaining.hours).charAt(1)}</span>
              <span className="text-5xl md:text-7xl lg:text-8xl mx-2">:</span>
              <span className="inline-block w-[1.2em]">{formatNumber(timeRemaining.minutes).charAt(0)}</span>
              <span className="inline-block w-[1.2em]">{formatNumber(timeRemaining.minutes).charAt(1)}</span>
              <span className="text-5xl md:text-7xl lg:text-8xl mx-2">:</span>
              <span className="inline-block w-[1.2em]">{formatNumber(timeRemaining.seconds).charAt(0)}</span>
              <span className="inline-block w-[1.2em]">{formatNumber(timeRemaining.seconds).charAt(1)}</span>
            </div>
            <div className="flex justify-center gap-8 md:gap-16 text-xl md:text-2xl text-muted-foreground font-medium">
              <span className="w-[2.4em] inline-block">DAYS</span>
              <span className="w-[2.4em] inline-block">HOURS</span>
              <span className="w-[2.4em] inline-block">MIN</span>
              <span className="w-[2.4em] inline-block">SEC</span>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-center text-7xl md:text-9xl lg:text-[12rem]">
              <span className="inline-block w-[1.2em]">{formatNumber(timeRemaining.hours).charAt(0)}</span>
              <span className="inline-block w-[1.2em]">{formatNumber(timeRemaining.hours).charAt(1)}</span>
              <span className="text-5xl md:text-7xl lg:text-8xl mx-2">:</span>
              <span className="inline-block w-[1.2em]">{formatNumber(timeRemaining.minutes).charAt(0)}</span>
              <span className="inline-block w-[1.2em]">{formatNumber(timeRemaining.minutes).charAt(1)}</span>
              <span className="text-5xl md:text-7xl lg:text-8xl mx-2">:</span>
              <span className="inline-block w-[1.2em]">{formatNumber(timeRemaining.seconds).charAt(0)}</span>
              <span className="inline-block w-[1.2em]">{formatNumber(timeRemaining.seconds).charAt(1)}</span>
            </div>
            <div className="flex justify-center gap-12 md:gap-20 text-xl md:text-2xl text-muted-foreground font-medium">
              <span className="w-[2.4em] inline-block">HOURS</span>
              <span className="w-[2.4em] inline-block">MIN</span>
              <span className="w-[2.4em] inline-block">SEC</span>
            </div>
          </div>
        )}
      </div>

      {isCritical && (
        <p className="text-2xl md:text-3xl font-display font-bold text-danger animate-pulse">
          ⚠️ FINAL COUNTDOWN ⚠️
        </p>
      )}
    </div>
  );
};

export default Timer;
