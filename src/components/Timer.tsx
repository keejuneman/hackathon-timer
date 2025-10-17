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
    <div className="text-center space-y-8 max-w-6xl mx-auto px-4">
      <div className={`font-display font-black ${getTimerColorClass()} transition-colors duration-300 tabular-nums`}>
        {timeRemaining.days > 0 ? (
          <div className="space-y-4">
            {/* 4개 시간 단위 (DAYS 포함) */}
            <div className="flex items-center justify-center gap-2 md:gap-4 text-5xl md:text-7xl lg:text-8xl xl:text-9xl">
              {/* DAYS */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center">
                  <span className="inline-block w-[0.8em] text-center">{formatNumber(timeRemaining.days).charAt(0)}</span>
                  <span className="inline-block w-[0.8em] text-center">{formatNumber(timeRemaining.days).charAt(1)}</span>
                </div>
                <span className="text-sm md:text-lg lg:text-xl text-muted-foreground font-medium">DAYS</span>
              </div>
              
              <span className="text-3xl md:text-5xl lg:text-6xl">:</span>
              
              {/* HOURS */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center">
                  <span className="inline-block w-[0.8em] text-center">{formatNumber(timeRemaining.hours).charAt(0)}</span>
                  <span className="inline-block w-[0.8em] text-center">{formatNumber(timeRemaining.hours).charAt(1)}</span>
                </div>
                <span className="text-sm md:text-lg lg:text-xl text-muted-foreground font-medium">HOURS</span>
              </div>
              
              <span className="text-3xl md:text-5xl lg:text-6xl">:</span>
              
              {/* MINUTES */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center">
                  <span className="inline-block w-[0.8em] text-center">{formatNumber(timeRemaining.minutes).charAt(0)}</span>
                  <span className="inline-block w-[0.8em] text-center">{formatNumber(timeRemaining.minutes).charAt(1)}</span>
                </div>
                <span className="text-sm md:text-lg lg:text-xl text-muted-foreground font-medium">MIN</span>
              </div>
              
              <span className="text-3xl md:text-5xl lg:text-6xl">:</span>
              
              {/* SECONDS */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center">
                  <span className="inline-block w-[0.8em] text-center">{formatNumber(timeRemaining.seconds).charAt(0)}</span>
                  <span className="inline-block w-[0.8em] text-center">{formatNumber(timeRemaining.seconds).charAt(1)}</span>
                </div>
                <span className="text-sm md:text-lg lg:text-xl text-muted-foreground font-medium">SEC</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 3개 시간 단위 (HOURS, MIN, SEC) */}
            <div className="flex items-center justify-center gap-4 md:gap-8 text-6xl md:text-8xl lg:text-9xl xl:text-[10rem]">
              {/* HOURS */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center">
                  <span className="inline-block w-[0.8em] text-center">{formatNumber(timeRemaining.hours).charAt(0)}</span>
                  <span className="inline-block w-[0.8em] text-center">{formatNumber(timeRemaining.hours).charAt(1)}</span>
                </div>
                <span className="text-sm md:text-lg lg:text-xl text-muted-foreground font-medium">HOURS</span>
              </div>
              
              <span className="text-4xl md:text-6xl lg:text-7xl">:</span>
              
              {/* MINUTES */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center">
                  <span className="inline-block w-[0.8em] text-center">{formatNumber(timeRemaining.minutes).charAt(0)}</span>
                  <span className="inline-block w-[0.8em] text-center">{formatNumber(timeRemaining.minutes).charAt(1)}</span>
                </div>
                <span className="text-sm md:text-lg lg:text-xl text-muted-foreground font-medium">MIN</span>
              </div>
              
              <span className="text-4xl md:text-6xl lg:text-7xl">:</span>
              
              {/* SECONDS */}
              <div className="flex flex-col items-center space-y-2">
                <div className="flex items-center">
                  <span className="inline-block w-[0.8em] text-center">{formatNumber(timeRemaining.seconds).charAt(0)}</span>
                  <span className="inline-block w-[0.8em] text-center">{formatNumber(timeRemaining.seconds).charAt(1)}</span>
                </div>
                <span className="text-sm md:text-lg lg:text-xl text-muted-foreground font-medium">SEC</span>
              </div>
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
