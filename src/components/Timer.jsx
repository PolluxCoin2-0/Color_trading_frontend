import { useState, useEffect } from "react";
import { endBidding, startBidding } from "../utils/axios";

const Timer = () => {
  const getNextHalfHour = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    const nextHalfHour = new Date(now);

    if (minutes < 30) {
      nextHalfHour.setMinutes(30, 0, 0); // Set to next half hour mark
    } else {
      nextHalfHour.setHours(now.getHours() + 1, 0, 0); // Set to the top of the next hour
    }

    return nextHalfHour;
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
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState({});
  const [targetDate, setTargetDate] = useState(getNextHalfHour());

  useEffect(() => {
    const timer = setInterval(() => {
      const timeRemaining = calculateTimeLeft(targetDate);

      if (Object.keys(timeRemaining).length === 0) {
        // Call endBidding when time reaches 00:00:00
        endBidding();

        // Set a delay before calling startBidding
        setTimeout(() => {
          startBidding();

          // Reset the target date to the next half hour
          setTargetDate(getNextHalfHour());
        }, 5000); // 5 seconds delay, adjust as needed
      } else {
        setTimeLeft(timeRemaining);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]); 

  return (
    <div className="flex items-start justify-center w-full gap-3 count-down-main bg-gradient-to-b from-[#4A93B6] to-[#006799] rounded-3xl py-2 border-[2px] shadow-inner shadow-[#006799] border-white">
      <div className="timer w-5">
        <div>
          <h3 className="countdown-element hours font-semibold text-2xl text-white">
            {String(timeLeft.hours).padStart(2, "0")}
          </h3>
        </div>
      </div>
      <h3 className="font-semibold text-2xl text-white pl-2">:</h3>

      <div className="timer w-5">
        <div>
          <h3 className="countdown-element minutes font-semibold text-2xl text-white">
            {String(timeLeft.minutes).padStart(2, "0")}
          </h3>
        </div>
      </div>
      <h3 className="font-semibold text-2xl text-white pl-2">:</h3>

      <div className="timer w-5">
        <div>
          <h3 className="countdown-element seconds font-semibold text-2xl text-white">
            {String(timeLeft.seconds).padStart(2, "0")}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Timer;
