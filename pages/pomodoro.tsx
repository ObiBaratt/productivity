import type { NextPage } from "next";
import { useContext } from "react";
import { PomodoroContext } from "../context/pomodoroContext";

const Pomodoro: NextPage = () => {
  const { start, stop, timer, isResting } = useContext(PomodoroContext);

  const handleDate = (seconds: number) => {
    let date = new Date(0);
    date.setSeconds(seconds);
    let timeString = date.toISOString().substring(14, 19);
    return timeString;
  };

  const handleDisplay = () => {
    if (timer > 0) {
      return (
        <>
          {isResting ? (
            <h3>Resting for: {handleDate(timer)}</h3>
          ) : (
            <h3>Working for: {handleDate(timer)}</h3>
          )}
        </>
      );
    } else {
      return <h3>Ready? Click the start button!</h3>;
    }
  };

  return (
    <>
      <h1>Pomodoro Timer</h1>
      {handleDisplay()}

      <button onClick={start}>Start Timer</button>
      <button onClick={stop}>Stop Timer</button>
    </>
  );
};

export default Pomodoro;
