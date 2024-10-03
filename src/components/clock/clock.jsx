import "./clock.scss";

import { useEffect, useState } from "react";

const Clock = ({ timeAdjustment }) => {
  const [currentTime, updateCurrentTime] = useState("");

  const getCurrentTime = () => {
    const hours = new Date().getHours();
    let minutes = new Date().getMinutes();

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    const hoursInt = parseInt(hours);
    let hourAdjustedTimeZone = hoursInt + timeAdjustment;
    let hourAdjustedRegular = hourAdjustedTimeZone;
    let amPm;

    if (hourAdjustedTimeZone < 12) {
      amPm = "am";
    }

    if (hourAdjustedTimeZone >= 12 && hourAdjustedTimeZone <= 23) {
      hourAdjustedRegular = hourAdjustedTimeZone - 12;
      amPm = "pm";
    }

    if (hourAdjustedTimeZone > 23) {
      hourAdjustedRegular = hourAdjustedTimeZone - 24;
      amPm = "am";
    }

    if (hourAdjustedTimeZone === 24) {
      hourAdjustedRegular = 12;
    }

    updateCurrentTime(`${hourAdjustedRegular}:${minutes} ${amPm}`);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      getCurrentTime();
    }, 1000);
    return () => clearInterval(timer);
  }, [timeAdjustment, getCurrentTime]);

  return <div className='clock'>{currentTime}</div>;
};

export default Clock;
