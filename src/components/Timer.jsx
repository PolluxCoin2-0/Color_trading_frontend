import { useState, useEffect } from "react";
import { endBidding, startBidding } from "../utils/axios";

const Timer = () => {
  const getNextTenMinutes = () => {
    const now = new Date();
    const nextTenMinutes = new Date(now);
    const minutes = now.getMinutes();
    const nextMinuteMark = Math.ceil(minutes / 10) * 10;

    nextTenMinutes.setMinutes(nextMinuteMark, 0, 0);
    if (nextTenMinutes <= now) {
      nextTenMinutes.setMinutes(nextTenMinutes.getMinutes() + 10);
    }

    return nextTenMinutes;
  };

  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = {
        hours: 0,
        minutes: 0,
        seconds: 0,
      };
    }

    return timeLeft;
  };

  // Set an initial state with default values for timeLeft
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [targetDate, setTargetDate] = useState(getNextTenMinutes());

  useEffect(() => {
    const timer = setInterval(() => {
      const timeRemaining = calculateTimeLeft(targetDate);

      if (timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds === 0) {
        endBidding();

        setTimeout(() => {
          startBidding();
          setTargetDate(getNextTenMinutes());
        }, 5000);
      } else {
        setTimeLeft({
          hours: String(timeRemaining.hours).padStart(2, "0"),
          minutes: String(timeRemaining.minutes).padStart(2, "0"),
          seconds: String(timeRemaining.seconds).padStart(2, "0"),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="flex items-start justify-center w-full gap-3 count-down-main bg-gradient-to-b from-[#4A93B6] to-[#006799] rounded-3xl py-2 border-[2px] shadow-inner shadow-[#006799] border-white">
      <div className="timer w-5">
        <div>
          <h3 className="countdown-element hours font-semibold text-2xl text-white">
            {timeLeft.hours}
          </h3>
        </div>
      </div>
      <h3 className="font-semibold text-2xl text-white pl-2">:</h3>

      <div className="timer w-5">
        <div>
          <h3 className="countdown-element minutes font-semibold text-2xl text-white">
            {timeLeft.minutes}
          </h3>
        </div>
      </div>
      <h3 className="font-semibold text-2xl text-white pl-2">:</h3>

      <div className="timer w-5">
        <div>
          <h3 className="countdown-element seconds font-semibold text-2xl text-white">
            {timeLeft.seconds}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Timer;
