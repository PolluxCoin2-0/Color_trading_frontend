import { useState, useEffect } from "react";
import { endBidding, startBidding } from "../utils/axios";

const Timer = () => {
  const getTargetDate = () => {
    const now = new Date();
    const startMorning = new Date();
    startMorning.setHours(8, 0, 0, 0);

    const startEvening = new Date();
    startEvening.setHours(20, 0, 0, 0);

    let targetDate;

    if (now >= startMorning && now < startEvening) {
      // Timer runs from 8:00 AM to 8:00 PM
      targetDate = startEvening;
    } else if (now >= startEvening || now < startMorning) {
      // Timer runs from 8:00 PM to 8:00 AM the next day
      if (now >= startEvening) {
        targetDate = new Date(startMorning);
        targetDate.setDate(now.getDate() + 1); // Set to 8:00 AM the next day
      } else {
        targetDate = startMorning; // If it's before 8:00 AM, count down to 8:00 AM
      }
    }

    return targetDate;
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
  const [targetDate, setTargetDate] = useState(getTargetDate());

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate));

    const timer = setInterval(() => {
      const timeRemaining = calculateTimeLeft(targetDate);
      if (Object.keys(timeRemaining).length === 0) {
        // Call endBidding when time reaches 00:00:00
        endBidding();

        // Set a delay before calling startBidding
        setTimeout(() => {
          startBidding();
          setTargetDate(getTargetDate()); // Reset the target date
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
