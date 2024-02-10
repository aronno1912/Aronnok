import React, { useEffect, useState } from 'react'

const CountdownTimer = ({ initialTime, onTimerEnd }) => {
    const [time, setTime] = useState(initialTime);

    useEffect(() => {
      // Exit the countdown if the time reaches 0
      if (time <= 0) {
        onTimerEnd(); // Call a function when the timer reaches 0
        return;
      }
  
      // Update the timer every second
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
  
      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, [time, onTimerEnd]);

    const formatTime = () => {
      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
  
      const padZero = (value) => (value < 10 ? `0${value}` : value);
  
      return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    };
  
    return (
      <div>
        <p>Time remaining: {formatTime()}</p>
      </div>
    );
}

export default CountdownTimer
