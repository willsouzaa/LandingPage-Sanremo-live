import { useState, useEffect } from "react";
import { eventDate } from "@/content/site";

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const diff = eventDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = [
    { label: "Dias", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Min", value: timeLeft.minutes },
    { label: "Seg", value: timeLeft.seconds },
  ];

  return (
    <div className="flex gap-3 md:gap-4">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col items-center">
          <span className="bg-secondary/90 backdrop-blur-sm rounded-lg px-3 py-2 md:px-5 md:py-3 text-2xl md:text-4xl font-heading font-bold text-secondary-foreground tabular-nums min-w-[60px] md:min-w-[80px] text-center">
            {String(u.value).padStart(2, "0")}
          </span>
          <span className="text-xs md:text-sm mt-1 font-body text-muted-foreground uppercase tracking-wider">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
