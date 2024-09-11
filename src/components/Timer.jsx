import { useState, useEffect } from "react";

const Timer = () => {
  // Function to calculate the next 8:00 AM or 8:00 PM interval
  const getNextTargetTime = () => {
    const now = new Date();
    const nextTarget = new Date(now);
    
    if (now.getHours() < 8 || (now.getHours() === 8 && now.getMinutes() === 0 && now.getSeconds() === 0)) {
      // If before 8:00 AM, set the target to 8:00 AM today
      nextTarget.setHours(8, 0, 0, 0);
    } else if (now.getHours() < 20 || (now.getHours() === 20 && now.getMinutes() === 0 && now.getSeconds() === 0)) {
      // If before 8:00 PM, set the target to 8:00 PM today
      nextTarget.setHours(20, 0, 0, 0);
    } else {
      // Otherwise, set the target to 8:00 AM the next day
      nextTarget.setDate(nextTarget.getDate() + 1);
      nextTarget.setHours(8, 0, 0, 0);
    }

    return nextTarget;
  };

  // Function to calculate the time left until the target date
  const calculateTimeLeft = (targetDate) => {
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
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

  // Set the initial target date for the countdown
  const [targetDate, setTargetDate] = useState(getNextTargetTime());

  // State to prevent multiple executions of startBidding and endBidding
  const [hasRun, setHasRun] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const timeRemaining = calculateTimeLeft(targetDate);

      if (
        timeRemaining.hours === 0 &&
        timeRemaining.minutes === 0 &&
        timeRemaining.seconds === 0 &&
        !hasRun // Ensure that it only runs once
      ) {
        // Wait for 5 seconds before resetting the timer
        setTimeout(() => {
          setTargetDate(getNextTargetTime());
          setHasRun(false); // Reset the hasRun state to allow future executions
        }, 5000);

        setHasRun(true); // Prevent further executions
      } else {
        setTimeLeft({
          hours: String(timeRemaining.hours).padStart(2, "0"),
          minutes: String(timeRemaining.minutes).padStart(2, "0"),
          seconds: String(timeRemaining.seconds).padStart(2, "0"),
        });
      }
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(timer);
  }, [targetDate, hasRun]);

  return (
    <div
      className="flex items-start justify-center w-full gap-3 count-down-main bg-gradient-to-b from-[#4A93B6] to-[#006799] rounded-3xl py-2 border-[2px]
     shadow-inner shadow-[#006799] border-white"
    >
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
