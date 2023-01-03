import type { NextPage } from "next";
import { useContext, useEffect } from "react";
import {
  PomodoroContext,
} from "../context/pomodoroContext";

const Pomodoro: NextPage = () => {
  const { start, stop, timer } = useContext(PomodoroContext);

  const handleDate = (seconds: number) => {
    let date = new Date(0)
    date.setSeconds(seconds)
    let timeString = date.toISOString().substring(11, 19);
    return timeString.slice(3);
  }

  return (
    <>
      <div>POMODORO GOES HERE</div>
      <h1>{handleDate(timer)}</h1>
      <button onClick={start}>Start Timer</button>
      <button onClick={stop}>Stop Timer</button>
    </>
  );
};

export default Pomodoro;
